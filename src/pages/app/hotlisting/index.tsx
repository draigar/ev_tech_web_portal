import { useRouter } from 'next/router'
import { useState } from 'react'
import { Footer, GreetingText } from 'web/components'
import { OpenNotification } from 'web/helper'
import { useBatteries } from 'web/hooks'
import { DefaultLayout } from 'web/layouts'
import { apiTypes, batteryDataList, createBatteryFormType } from 'web/types'

export default function HotListing() {
    const router = useRouter()
    const [batteryName, setBatteryName] = useState('')
    const [batteryStatus, setBatteryStatus] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [batteryId, setBatteryId] = useState(0)
    const [alertMode, setAlertMode] = useState({
        type: '',
        message: ''
    })

    const { updateBattery, searchBatteries, batteryStates } = useBatteries();
    const { searchResultData, resetSearchResultData } = batteryStates;

    const DoUpdateBattery = () => {
        if (batteryId === 0) {
            OpenNotification({
                type: 'warning',
                title: 'Battery update',
                description: 'Search and select a battery'
            })
        } else {
            const payload: createBatteryFormType = {
                name: batteryName,
                status: batteryStatus ? 4 : 0,
            }
            updateBattery.mutate({ id: batteryId, rq: payload }, {
                onSuccess: (val: apiTypes) => {
                    if (val.status) {
                        OpenNotification({
                            type: 'success',
                            title: 'Battery Update',
                            description: `Battery ${batteryName} has been hot listed`
                        })
                        router.push('/app/batteries')
                    } else {
                        OpenNotification({
                            type: 'error',
                            description: val.message,
                            title: 'Battery Update'
                        })
                    }
                }
            })
        }
    };

    const searchData = () => {
        setAlertMode({
            ...alertMode,
            type: '',
            message: ''
        })
        if (searchQuery !== "") {
            searchBatteries.mutate({ query: searchQuery }, {
                onError: (error) => {
                    console.log(error)
                    setAlertMode({
                        ...alertMode,
                        type: 'danger',
                        message: 'A system error'
                    })
                }
            })
        } else {
            setAlertMode({
                ...alertMode,
                type: 'warning',
                message: 'Your search is empty'
            })
        }
    }

    const setSelectedSearch = (data: batteryDataList) => {
        setBatteryName(data.name)
        setBatteryId(data.id)
        setBatteryStatus(data.status === 0 ? false : data.status === 4 ? true : false)
        resetSearchResultData()
    }

    return (
        <DefaultLayout title="Hot Listing">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="Hot list batteries" />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card card-animate">
                                                <div className="card-body">
                                                    <p>Update your battery data</p>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            {alertMode.type !== "" && (
                                                                <div className={`alert alert-${alertMode.type}`} role="alert">
                                                                    {alertMode.message}
                                                                </div>
                                                            )}

                                                            <div className='app-search'>
                                                                <label htmlFor="username" className="form-label">Search batteries here</label>
                                                                <div className="position-relative">
                                                                    <input type="text" className="form-control border" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ backgroundColor: 'white' }} placeholder="Search..." autoComplete="off" />
                                                                    <span className="mdi mdi-magnify search-widget-icon"></span>
                                                                    {searchResultData && searchResultData.length > 0 ? (
                                                                        <span onClick={() => { resetSearchResultData(); setSearchQuery('') }} className="mdi mdi-close-circle seaßrch-widget-icon search-widget-icon-close position-absolute" id="search-close-options" style={{ right: 12, top: 12 }}></span>
                                                                    ) : (
                                                                        searchBatteries.isLoading ? (
                                                                            <div className="spinner-border text-primary position-absolute" style={{ right: 0, top: 0 }} role="status">
                                                                                <span className="sr-only">Loading...</span>
                                                                            </div>
                                                                        ) : (
                                                                            <button onClick={() => searchData()} type="button" className="btn btn-primary btn-sm waves-effect waves-light rounded-pill position-absolute" style={{ right: 0, top: 0 }}>
                                                                                <i className="mdi mdi-magnify search-widget-icon align-middle rounded-pill fs-18"></i>
                                                                            </button>
                                                                        )
                                                                    )}
                                                                </div>
                                                                {searchResultData !== undefined && searchResultData.length > 0 && (
                                                                    <div className="dropdown-menu dropdown-menu-lg d-block" id="search-dropdown">
                                                                        <div data-simplebar style={{ maxHeight: '320px' }}>
                                                                            <div className="dropdown-header mt-2">
                                                                                <h6 className="text-overflow text-muted mb-1 text-uppercase">Batteries based on your search</h6>
                                                                            </div>

                                                                            {searchResultData && searchResultData.map((tl, t: number) => (
                                                                                <a href="#" onClick={() => setSelectedSearch(tl)} className="dropdown-item notify-item" key={t}>
                                                                                    <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2"></i>
                                                                                    <span key={t}>{tl.name}</span>
                                                                                    <span key={t}>{tl.code}</span>
                                                                                </a>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <label htmlFor="batteryName" className="form-label col-lg-12">Battery Name</label>
                                                            <p><small>Populated from search</small></p>
                                                            <input type="text" disabled required value={batteryName} onChange={(e) => setBatteryName(e.target.value)} className="form-control" id="batteryName" />
                                                        </div>
                                                        <div className='col-lg-12 mt-3'>
                                                            <div className="form-check form-switch form-switch-md">
                                                                <input type="checkbox" className="form-check-input" id="customSwitchsizemd" checked={batteryStatus} onChange={(e) => setBatteryStatus(e.target.checked)} />
                                                                <label className="form-check-label" htmlFor="customSwitchsizemd">Status - {batteryStatus ? 'Hot listed' : 'Not hot listed'}</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-auto mt-4">
                                                            <button className="btn btn-primary" type="button" disabled={updateBattery.isLoading} onClick={() => DoUpdateBattery()}> {updateBattery.isLoading ? 'Sending to server...' : 'Update Battery'}</button>
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
