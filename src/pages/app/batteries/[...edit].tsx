import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { DefaultButton, Footer, GreetingText } from 'web/components'
import { OpenNotification } from 'web/helper'
import { useBatteries } from 'web/hooks'
import { DefaultLayout } from 'web/layouts'
import { apiTypes, createBatteryFormType } from 'web/types'

export default function EditBattery() {
    const router = useRouter()
    const [batteryName, setBatteryName] = useState('')
    const [batteryCode, setBatteryCode] = useState('')
    const [batteryDescription, setBatteryDescription] = useState('')
    const [batteryStatus, setBatteryStatus] = useState(false)

    let queryData: any = router.query.edit;
    const id = queryData && queryData[1];
    const setName = queryData && queryData[0];

    const { getSingleBatteryById, batteryStates, batteryCreation, updateBattery } = useBatteries();
    const { singleBatteryData } = batteryStates;

    const getSingle = useCallback(() => {
        if (id) {
            const val = singleBatteryData;
            const result = singleBatteryData;
            setBatteryDescription(result?.description ?? '')
            setBatteryCode(result?.code ?? '')
            setBatteryName(result?.name ?? '')
            setBatteryStatus(result?.status === 0 ? false : true)
            console.log('=================testing===================');
            console.log(val);
            console.log('====================================');
        }
    }, [id, singleBatteryData])

    const UpdateBattery_ = () => {
        if (batteryName === "") {
            OpenNotification({
                type: 'warning',
                title: 'Battery update',
                description: 'Battery name is required'
            })
        } else {
            const payload: createBatteryFormType = {
                code: batteryCode,
                description: batteryDescription,
                name: batteryName,
                status: batteryStatus ? 1 : 0,
            }
            updateBattery.mutate({ id: id, rq: payload }, {
                onSuccess: (val: apiTypes) => {
                    if (val.status) {
                        OpenNotification({
                            type: 'success',
                            title: 'Battery Update',
                            description: `Battery ${batteryName} has been updated`
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
    }

    useEffect(() => {
        getSingleBatteryById.mutate({ id: id })
    }, [id])

    useEffect(() => {
        getSingle()
    }, [getSingle])

    return (
        <DefaultLayout title={`Edit Battery - ${setName}`}>
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description={`Edit battery - ${setName}`} />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card card-animate">
                                                <div className="card-body">
                                                    <p>Create your battery data</p>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <label htmlFor="batteryName" className="form-label">Battery Name</label>
                                                            <input type="text" required value={batteryName} onChange={(e) => setBatteryName(e.target.value)} className="form-control" id="batteryName" />
                                                        </div>
                                                        <div className="col-md-12 mt-2">
                                                            <label htmlFor="batteryDescription" className="form-label">Battery Description</label>
                                                            <textarea value={batteryDescription} onChange={(e) => setBatteryDescription(e.target.value)} className="form-control" id="batteryDescription" />
                                                        </div>
                                                        <div className='col-lg-12 mt-2'>
                                                            <div className="form-check form-switch form-switch-md">
                                                                <input type="checkbox" className="form-check-input" id="customSwitchsizemd" checked={batteryStatus} onChange={(e) => setBatteryStatus(e.target.checked)} />
                                                                <label className="form-check-label" htmlFor="customSwitchsizemd">Status - {batteryStatus ? 'Active' : 'In Active'}</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-auto mt-4">
                                                            <button className="btn btn-primary" type="button" disabled={updateBattery.isLoading} onClick={() => UpdateBattery_()}> {updateBattery.isLoading ? 'Sending to server...' : 'Update Battery'}</button>
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
