import Image from 'next/image';
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react';
import { Footer, GreetingText } from 'web/components'
import { useBatteries, useChargingStations } from 'web/hooks';
import { DefaultLayout } from 'web/layouts'
import { apiTypes, chargingStationGetApiType, slotsType } from 'web/types';

export default function ViewChargingStation() {

    const router = useRouter();
    let queryData: any = router.query.view;

    const {getSingleStation, chargingStates} = useChargingStations()
    const {stationSingleData} = chargingStates;

    const showChargingInfo = (id: string) => { }

    const displaySlotData = (slotData: number[]) => {
        if (slotData.length > 0) {
            for (let i = 0; i < slotData.length; i++) {
                const el: any = slotData[i];
                const slot_number = el.slot_number;
                const batteryCode = el.batteryCode;
                const batteryId = el.batteryId;
                const batteryStatus = el.batteryStatus;
                const slotColumn = document.getElementById(`slot${slot_number}`);
                if (slotColumn) {
                    const h2Element = slotColumn.querySelector('h2');
                    const codeElement = slotColumn.querySelector('code');
                    const divElement = slotColumn.querySelector('div');
                    if (h2Element) {
                        h2Element.textContent = slot_number.toString();
                    }
                    if (codeElement) {
                        codeElement.textContent = batteryCode;
                    }
                    if (!batteryId) {
                        if (divElement) {
                            divElement.style.backgroundColor = '#4a1919';
                        }
                    }
                }
            }
        }
    }

    useEffect(() => {
        getSingleStation.mutate({id: queryData && queryData[1]})
    }, [])

    useEffect(() => {
        const result: any = stationSingleData;
        if (result) {
            const slots = result.slots;
            let slotData: any[] = [];
            for (let i = 0; i < slots.length; i++) {
                const el: slotsType = slots[i];
                slotData.push({
                    slot_number: el.slot_number,
                    batteryId: el.battery_id,
                    batteryCode: el.battery_code,
                    batteryStatus: el.battery_status,
                })
            }
            displaySlotData(slotData)
        }
    }, [stationSingleData])

    return (
        <DefaultLayout title={`Charging Station - ${queryData && queryData[0]}`}>
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description={`Welcome - view station ${queryData && queryData[0]}`} />
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='box p-4 mb-4' style={{}}>
                                                <div className='row'>
                                                    <div className='col-md-4 p-0'>
                                                        <div className='' style={{ borderRadius: 8, backgroundColor: 'black', height: 180 }}>
                                                            <Image src={stationSingleData?.image ?? ''} alt='Station image' width={215} style={{borderRadius: 8}} height={180} />
                                                        </div>
                                                    </div>
                                                    <div className='col-md-8'>
                                                        <h6>{stationSingleData?.name}</h6>
                                                        <p>{stationSingleData?.description}</p>
                                                        <div className='d-flex gap-2'>
                                                            <span>City: {stationSingleData?.city}</span>
                                                            <span>State: {stationSingleData?.state}</span>
                                                        </div>
                                                        <div className='d-flex flex-column'>
                                                            <span>Number of slots: {stationSingleData?.number_of_slots}</span>
                                                            <span>Code: {stationSingleData?.code}</span>
                                                            <code>Lat: {stationSingleData?.latitude}</code>
                                                            <code>Lng: {stationSingleData?.longitude}</code>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='box p-4' style={{ height: 550 }}>
                                                <div className='row' style={{ height: '100%' }}>
                                                    <div className='col-md-5 h-full'>
                                                        <div className='row'>
                                                            <div id='slot1' onClick={() => showChargingInfo('1')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                            <div id='slot2' onClick={() => showChargingInfo('2')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-3'>
                                                            <div id='slot5' onClick={() => showChargingInfo('5')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                            <div id='slot6' onClick={() => showChargingInfo('6')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-3'>
                                                            <div id='slot9' onClick={() => showChargingInfo('9')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                            <div id='slot10' onClick={() => showChargingInfo('10')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-3'>
                                                            <div id='slot13' onClick={() => showChargingInfo('13')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                            <div id='slot14' onClick={() => showChargingInfo('14')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-3'>
                                                            <div id='slot17' onClick={() => showChargingInfo('17')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                            <div id='slot18' onClick={() => showChargingInfo('18')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-2 h-full border'>
                                                        <div className='border' style={{ borderRadius: 8, width: '100%', height: 80, marginTop: '120px', borderColor: '#f8f8f8', backgroundColor: 'black' }}></div>
                                                        <p className='p-2 text-center' style={{ fontSize: '10px' }}>EV Charging Station</p>
                                                        <p className='p-2 text-center' style={{ fontSize: '10px', fontWeight: 'bold' }}>ID: <code>{stationSingleData?.code}</code></p>
                                                    </div>
                                                    <div className='col-md-5 h-full'>
                                                        <div className='row'>
                                                            <div id='slot3' onClick={() => showChargingInfo('3')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                            <div id='slot4' onClick={() => showChargingInfo('4')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-3'>
                                                            <div id='slot7' onClick={() => showChargingInfo('7')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                            <div id='slot8' onClick={() => showChargingInfo('8')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-3'>
                                                            <div id='slot11' onClick={() => showChargingInfo('11')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                            <div id='slot12' onClick={() => showChargingInfo('12')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-3'>
                                                            <div id='slot15' onClick={() => showChargingInfo('15')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                            <div id='slot16' onClick={() => showChargingInfo('16')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-3'>
                                                            <div id='slot19' onClick={() => showChargingInfo('19')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                            <div id='slot20' onClick={() => showChargingInfo('20')} className='col-md-6' style={{cursor: 'pointer'}}>
                                                                <div className='border p-4 text-center' style={{ height: 88, borderRadius: 8, backgroundColor: '#36454F' }}>
                                                                    <h2 style={{ color: 'white' }}></h2>
                                                                    <code></code>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
