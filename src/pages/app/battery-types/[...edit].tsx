import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { DefaultButton, Footer, GreetingText } from 'web/components'
import { OpenNotification } from 'web/helper'
import { useBatteries } from 'web/hooks'
import { DefaultLayout } from 'web/layouts'
import { apiTypes, batteryCreateType, createBatteryFormType } from 'web/types'

export default function EditBatteryType() {
    const router = useRouter()
    const [typeName, setName] = useState('');
    const [description, setDescription] = useState('');
    const [voltage, setVoltage] = useState(0);
    const [power, setPower] = useState(0);
    const [fee, setFee] = useState(0);
    const [collectionDays, setCollectionDays] = useState(0);
    const [collectionFees, setCollectionFees] = useState(0);
    const [batteryTypeStatus, setBatteryTypeStatus] = useState(false)

    let queryData: any = router.query.edit;
    const id = queryData && queryData[1];
    const name = queryData && queryData[0]

    const { getSingleBatteryTypeById, batteryStates, updateBatteryType } = useBatteries();
    const { singleBatteryTypeData } = batteryStates;

    const getSingle = useCallback(() => {
        if (id) {
            const result: any = singleBatteryTypeData;
            setName(result?.name ?? '');
            setDescription(result?.description ?? '');
            setVoltage(result?.voltage ?? 0);
            setPower(result?.power ?? 0);
            setFee(result?.fee ?? 0);
            setCollectionDays(result?.collection_due_days ?? 0);
            setCollectionFees(result?.collection_due_fees ?? 0);
        }
    }, [id, singleBatteryTypeData])

    const UpdateBatteryType = () => {
        if (typeName === "") {
            OpenNotification({
                type: 'warning',
                title: 'Battery type update',
                description: 'Battery type name is required'
            })
        } else {
            const payload: batteryCreateType = {
                name: typeName,
                fee: fee,
                power: power.toString(),
                voltage: voltage.toString(),
                description: description,
                collection_due_days: collectionDays,
                collection_due_fees: collectionFees,
                status: batteryTypeStatus ? 1 : 0,
            }
            updateBatteryType.mutate({ id: id, rq: payload }, {
                onSuccess: (val: apiTypes) => {
                    if (val.status) {
                        OpenNotification({
                            type: 'success',
                            title: 'Battery Update',
                            description: `Battery ${typeName} has been updated`
                        })
                        router.push('/app/battery-types')
                    } else {
                        OpenNotification({
                            type: 'error',
                            description: val.message,
                            title: 'Battery Type Update'
                        })
                    }
                }
            })
        }
    }

    useEffect(() => {
        getSingleBatteryTypeById.mutate({ id: id })
    }, [id])

    useEffect(() => {
        getSingle()
    }, [getSingle])

    return (
        <DefaultLayout title={`Edit Battery type - ${name}`}>
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description={`Edit battery type - ${name}`} />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card card-animate">
                                                <div className="card-body">
                                                    <p>Create your battery data</p>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <label htmlFor="name" className="form-label">Battery Type Name</label>
                                                            <input type="text" required value={typeName} onChange={(e) => setName(e.target.value)} className="form-control" id="name" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="voltage" className="form-label">Battery Nominal Voltage</label>
                                                            <input type="text" required value={voltage} onChange={(e) => setVoltage(parseInt(e.target.value, 10))} className="form-control" id="voltage" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="power" className="form-label">Battery Power</label>
                                                            <input type="text" required value={power} onChange={(e) => setPower(parseInt(e.target.value, 10))} className="form-control" id="power" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="fee" className="form-label">Battery Fee</label>
                                                            <input type="text" required value={fee} onChange={(e) => setFee(parseInt(e.target.value, 10))} className="form-control" id="fee" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="dueDays" className="form-label">Battery Collection due days</label>
                                                            <input type="text" required value={collectionDays} onChange={(e) => setCollectionDays(parseInt(e.target.value, 10))} className="form-control" id="dueDays" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="dueFees" className="form-label">Battery Collection due fees</label>
                                                            <input type="text" required value={collectionFees} onChange={(e) => setCollectionFees(parseInt(e.target.value, 10))} className="form-control" id="dueFees" />
                                                        </div>
                                                        <div className="col-md-12 mt-2">
                                                            <label htmlFor="batteryDescription" className="form-label">Battery Type Description</label>
                                                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="batteryDescription" />
                                                        </div>
                                                        <div className="col-auto mt-4">
                                                            <button className="btn btn-primary" type="button" disabled={updateBatteryType.isLoading} onClick={() => UpdateBatteryType()}> {updateBatteryType.isLoading ? 'Sending to server...' : 'Update Battery Type'}</button>
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
