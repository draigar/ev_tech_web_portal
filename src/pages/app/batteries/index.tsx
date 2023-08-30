import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DashboardMapParams, DefaultButton, Footer, GreetingText } from "web/components";
import { useBatteries } from "web/hooks";
import { DefaultLayout } from "web/layouts";
import { apiPaginatedTypes, batteryDataList } from "web/types";
import {undefined} from "zod";

export default function Batteries() {
    const [idNumber, setIdNumber] = useState('');
    const [batName, setBatName] = useState('');
    const [searchResult, setSearchResult] = useState<batteryDataList[]>([]);
    const [selectedLat, setSelectedLat] = useState(6.546513741105146);
    const [selectedLng, setSelectedLng] = useState(3.3629270772567477);
    const [selectedBattery, setSelectedBattery] = useState<batteryDataList>();

    const { fetchAllBatteries, searchBatteries } = useBatteries({ fetchAllBatteries: false });

    const router = useRouter();

    const { data, error, isFetched, isFetching } = fetchAllBatteries

    const SearchForData = () => {
        setSearchResult([]);
        if (idNumber === '') {
            alert('Opps! no search entry')
        }
        else {
            searchBatteries.mutate({ query: idNumber }, {
                onSuccess: (val: apiPaginatedTypes) => {
                    const response: any = val.items;
                    const res: batteryDataList[] = []
                    response.map((el: batteryDataList) => {
                        res.push({
                            id: el.id,
                            code: el.code,
                            name: el.name,
                            description: el.description,
                            charge: el.charge,
                            longitude: el.longitude,
                            latitude: el.latitude,
                            temperature: el.temperature,
                            voltage: el.voltage,
                            status: el.status,
                        })
                    })
                    console.log('response', res)
                    setSearchResult(res)
                }
            })
        }
    }

    const waypoints: google.maps.DirectionsWaypoint[] = [
        { location: 'San Francisco, CA' },
        { location: 'Los Angeles, CA' },
        { location: 'Las Vegas, NV' },
    ];

    const chooseABattery = (index: number) => {
        const res = searchResult[index]
        setSelectedBattery(res)
    }

    const SearchForm = () => (
        <div className="screenMapSearchArea">
            <div className="card card-animate">
                <div className="card-body">
                    <p>Search with battery data</p>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="idNumber" className="form-label">ID Number</label>
                            <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className="form-control" id="idNumber" />
                        </div>
                        {/* <div className="col-auto">
                                                                    <label htmlFor="batName" className="form-label">Battery Name</label>
                                                                    <input type="text" value={batName} onChange={(e) => setBatName(e.target.value)} className="form-control" id="batName" />
                                                                </div> */}
                        <div className="col-auto mt-4">
                            <DefaultButton isLoading={searchBatteries.isLoading} isLoadingText="Searching..." onClick={() => SearchForData()} className="btn-primary">Search</DefaultButton>
                        </div>
                    </div>
                </div>
            </div>
            {searchResult && searchResult.length > 0 && (
                <div className="card card-animate intro-y">
                    <div className="card-body" style={{ height: '400px', maxHeight: '400px', overflow: 'auto' }}>
                        {searchResult.map(({ id, name, code, status, charge }, i: number) => {
                            if (name !== null) {
                                return (
                                    <div className="SearchDataList" key={i}>
                                        <div className="row">
                                            <div className="col-md-3 d-flex justify-content-center align-items-center">
                                                <div className="border dataListIcon d-flex justify-content-center align-items-center">
                                                    <i className="ri-battery-2-charge-line iconHigh"></i>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <h6>{name}</h6>
                                                <div className="">
                                                    <p className="d-flex align-items-center gap-2">
                                                        <span className="activeState" style={{
                                                            backgroundColor: status === 0 ? '#878a99' : status === 1 ? '#405189'
                                                                : status === 2 ? '#61cf61' : status === 3 ? '#f7b84b' : status === 4 ? '#eb2c2c' : '#eb2c2c'
                                                        }}></span> Active
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <button onClick={() => chooseABattery(i)} className="btn btn-sm btn-primary w-100">Select</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            )}

        </div>
    );

    useEffect(() => {
        // Get the user's current location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setSelectedLat(position.coords.latitude);
                setSelectedLng(position.coords.longitude);
                console.log('positions', position)
            },
            (error) => {
                console.error('Error getting current location:', error);
            }
        );
    }, []);

    const pushToMap = (to: 'customer' | 'station') => {
        const forCustomer = {
            latitude: 6.541738540102855,
            longitude: 3.3437010028217915,
        }
        const station = {
            latitude: 6.554699693693319,
            longitude: 3.386616347542677,
        }

        if (to === 'customer') {
            setSelectedLat(forCustomer.latitude)
            setSelectedLng(forCustomer.longitude)
        }
        else if (to === 'station') {
            setSelectedLat(station.latitude)
            setSelectedLng(station.longitude)
        }
    }

    const ResultView = () => (
        <div className="screenMapSearchArea">
            <DefaultButton onClick={() => setSelectedBattery({
                charge: "",
                code: "",
                description: "",
                id: 0,
                latitude: "",
                longitude: "",
                name: "",
                status: 0,
                temperature: "",
                voltage: ""
            })} className="btn-success mb-4 p-1 px-4 waves-effect waves-light layout-rightside-btn">Back</DefaultButton>
            <div className="card card-animate intro-y">
                <div className="card-body">
                    <div className="">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="border dataListIcon d-flex justify-content-center align-items-center">
                                    <i className="ri-battery-2-charge-line iconHigh"></i>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h6>{selectedBattery?.name}</h6>
                                <div className="">
                                    <p className="d-flex align-items-center gap-2">
                                        <span className="activeState" style={{
                                            backgroundColor: selectedBattery?.status == 1 ? 'rgb(56, 164, 34)' : '#eb2c2c'
                                        }}></span> {selectedBattery?.status === 1 ? 'Active' : 'In Active'}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                {/* <button className="btn btn-sm btn-primary w-100">Select</button> */}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <p>ID number</p>
                            <h6>{selectedBattery?.code}</h6>
                        </div>
                        <div className="col-md-3">
                            <p>Voltage</p>
                            <h6>{selectedBattery?.voltage}</h6>
                        </div>
                        <div className="col-md-5" style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className="w-100" style={{ width: '100%' }}>Location</span>
                            <span style={{ fontSize: '10px' }}>Lat: <code>{selectedBattery?.latitude}</code></span>
                            <span style={{ fontSize: '10px' }}>Lng: <code>{selectedBattery?.longitude}</code></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card card-animate intro-y">
                <div className="card-body" style={{ height: '400px', maxHeight: '400px', overflow: 'auto' }}>
                    <ul className="nav nav-pills arrow-navtabs nav-success bg-light mb-3" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-bs-toggle="tab" href="#arrow-overview" role="tab">
                                <span className="d-block d-sm-none"><i className="mdi mdi-home-variant"></i></span>
                                <span className="d-none d-sm-block">Battery Info</span>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content text-muted">
                        <div className="tab-pane active" id="arrow-overview" role="tabpanel">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }}><span>State of Charge (SOC):</span> <span>{selectedBattery?.charge}%</span></li>
                                <li className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Voltage:</span><span>{selectedBattery?.voltage} Volts</span></li>
                                {/* <li className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Current Draw:</span> <span>need api A.</span></li> */}
                                <li className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Temperature:</span> <span>{selectedBattery?.temperature}°C</span></li>
                                {/* <li className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Humidity:</span> <span>72%</span></li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content text-muted mt-4">
                        <p className="text-muted">Assigned Customer Information</p>
                        <div className="tab-pane active" id="arrow-overview" role="tabpanel">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Customer Name:</span> <span>Elizabeth Doe</span></li>
                                <li className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Customer ID:</span><span>A4567B87</span></li>
                                <li className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Customer Address:</span> <span>No 2, Ogunji Street</span></li>
                                <li className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>Location:</span>
                                    <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '10px' }}>Lat: <code>74837634343489384.9887</code></span>
                                        <span style={{ fontSize: '10px' }}>Lng: <code>74837634343489384.9887</code></span>
                                    </div>
                                    <DefaultButton onClick={() => pushToMap('customer')} className="btn-soft-info btn-sm waves-effect waves-light layout-rightside-btn">View in Map</DefaultButton>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content text-muted mt-4">
                        <p className="text-muted">Charging Station Information</p>
                        <div className="tab-pane active" id="arrow-overview" role="tabpanel">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Charging Station Name:</span> <span>Elizabeth Doe</span></li>
                                <li className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Charging Station ID:</span><span>A4567B87</span></li>
                                <li className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Charging Station Address:</span> <span>No 2, Ogunji Street</span></li>
                                <li className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>Location:</span>
                                    <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '10px' }}>Lat: <code>74837634343489384.9887</code></span>
                                        <span style={{ fontSize: '10px' }}>Lng: <code>74837634343489384.9887</code></span>
                                    </div>
                                    <DefaultButton onClick={() => pushToMap('station')} className="btn-soft-info btn-sm waves-effect waves-light layout-rightside-btn">View in Map</DefaultButton>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <DefaultLayout title="Batteries">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="Get the latest on available batteries" additionalComponent={() => (
                                        <Link href="/app/batteries/create" className="btn-info mx-2 waves-effect waves-light layout-rightside-btn">
                                            <p>Create Batteries</p>
                                        </Link>
                                    )} />
                                    <div className="row">
                                        <div className="col-span-12">
                                            <div className="screenMap intro-y">
                                                {selectedBattery && selectedBattery?.id ? <ResultView /> : SearchForm()}
                                                <DashboardMapParams lat={selectedLat} lng={selectedLng} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-auto layout-rightside-col"></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </DefaultLayout>
    )
}
