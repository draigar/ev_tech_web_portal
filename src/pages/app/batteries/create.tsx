import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { DefaultButton, GreetingText } from "web/components";
import { OpenNotification } from "web/helper";
import { useBatteries } from "web/hooks";
import { DefaultLayout } from "web/layouts";
import { apiPaginatedTypes, apiTypes, batteryTypeApi, createBatteryFormType } from "web/types";

export default function CreateBatteries() {
    const router = useRouter();

    const [batteryName, setBatteryName] = useState('')
    const [batteryCode, setBatteryCode] = useState('')
    const [batteryDescription, setBatteryDescription] = useState('')
    const [type_id, setTypeId] = useState<number>(0);

    const { batteryCreation, fetchBatteryTypes } = useBatteries({ fetchBatteryTypes: true })

    const DoCreateBattery = () => {
        if (batteryName === '' && batteryCode === '') {
            OpenNotification({
                description: 'Battery Name and Code are required',
                type: 'warning'
            })
        } else {
            const payload: createBatteryFormType = {
                code: batteryCode,
                name: batteryName,
                description: batteryDescription,
                type_id: type_id,
            }
            batteryCreation.mutate(payload, {
                onSuccess: (val: apiTypes) => {
                    if (val.status) {
                        OpenNotification({
                            description: `Battery ${batteryName} has been created`,
                            type: 'success'
                        })
                    } else {
                        OpenNotification({
                            description: val.message,
                            type: 'error'
                        })
                    }
                }
            })
        }
    }

    const GetBatteryTypes = useCallback(() => {
        const { data, status, refetch, isFetching } = fetchBatteryTypes;
        const res: apiPaginatedTypes = data;
        const resultStatus: any = res?.items;
        const result: any = res?.items;
        console.log('battery type ' + result)
        if (status === "loading") {
            return (
                <div className="col-lg-12 mt-2">
                    <label htmlFor="batteryCode" className="form-label">Choose Battery Type</label>
                    <p>Fetching battery types...</p>
                </div>
            )
        } else {
            if (resultStatus?.length > 0) {
                return (
                    <div className="col-lg-12 mt-2">
                        <label htmlFor="batteryCode" className="form-label">Choose Battery Type</label>
                        <select className="form-control w-full" name="batteryType" title="Battery Type" 
                        onInput={(e: any) => setTypeId(e.target.value)}>
                            <option value={0}>Choose Battery type</option>
                            {result.map((el: batteryTypeApi, i: number) => (
                                <option value={el.id} key={i}>{el.name}</option>
                            ))}
                        </select>
                    </div>
                )
            } else {
                return (
                    <div className="col-lg-12 mt-2">
                        <label htmlFor="batteryCode" className="form-label">Choose Battery Type</label>
                        <div className="flex flex-row">
                            <p className="">We could not fetch battery data:</p>
                            <DefaultButton onClick={() => refetch()} className="btn-info mx-2 waves-effect waves-light layout-rightside-btn"> {isFetching ? 'Refetching' : 'Try again'}</DefaultButton>
                        </div>
                    </div>
                )
            }
        }
    }, [fetchBatteryTypes])

    return (
        <DefaultLayout title="Create Batteries">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="Create batteries" />
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
                                                        {GetBatteryTypes()}
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="batteryCode" className="form-label">Battery Code</label>
                                                            <input type="text" required value={batteryCode} onChange={(e) => setBatteryCode(e.target.value)} className="form-control" id="batteryCode" />
                                                        </div>
                                                        <div className="col-md-12 mt-2">
                                                            <label htmlFor="batteryDescription" className="form-label">Battery Description</label>
                                                            <textarea value={batteryDescription} onChange={(e) => setBatteryDescription(e.target.value)} className="form-control" id="batteryDescription" />
                                                        </div>
                                                        <div className="col-auto mt-4">
                                                            <button className="btn btn-primary" type="button" disabled={batteryCreation.isLoading} onClick={() => DoCreateBattery()}> {batteryCreation.isLoading ? 'Sending to server...' : 'Create Battery'}</button>
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
            </main>
        </DefaultLayout>
    )
}