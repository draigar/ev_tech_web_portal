import { Footer, GreetingText } from 'web/components'
import { apiTypes, batteryCreateType } from 'web/types';

import { DefaultLayout } from 'web/layouts'
import { OpenNotification } from 'web/helper';
import { useBatteries } from 'web/hooks';
import { useState } from 'react'

export default function BatteryTypeCreate() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [voltage, setVoltage] = useState('');
    const [power, setPower] = useState('');
    const [fee, setFee] = useState('');
    const [collectionDays, setCollectionDays] = useState('');
    const [collectionFees, setCollectionFees] = useState('');

    const {createBatteryType} = useBatteries();

    const resetData = () => {
        setName('');
        setDescription('');
        setVoltage('');
        setPower('');
        setFee('');
        setCollectionDays('');
        setCollectionFees('');
    };

    const DoCreateType = () => {
        const batCode = (Math.random() + 1).toString(36).substring(9)
        if (name === '' && fee === '') {
            OpenNotification({
                description: 'Battery Name and Code are required',
                type: 'warning'
            })
        } else {
            
            const payload: batteryCreateType = {
                code: batCode,
                collection_due_days: parseInt(collectionDays, 10),
                collection_due_fees: parseInt(collectionFees, 10),
                description: description,
                fee: parseInt(fee, 10),
                name: name,
                power: power,
                voltage: voltage,
            }

            createBatteryType.mutate(payload, {
                onSuccess: (val: apiTypes) => {
                    if (val.status) {
                        OpenNotification({
                            description: `Battery type ${name} has been created`,
                            type: 'success'
                        })
                        resetData();
                    } else {
                        OpenNotification({
                            description: val.message,
                            type: 'error'
                        })
                    }
                },
                onError: () => {
                    OpenNotification({
                        description: 'An error occurred, do check your internet connection',
                        type: 'error'
                    })
                }
            })
        }
    }

  return (
    <DefaultLayout title="Create Battery Type">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="Create battery type" />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card card-animate">
                                                <div className="card-body">
                                                    <p>Create your battery type</p>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <label htmlFor="name" className="form-label">Battery Type Name</label>
                                                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="voltage" className="form-label">Battery Nominal Voltage</label>
                                                            <input type="text" required value={voltage} onChange={(e) => setVoltage(e.target.value)} className="form-control" id="voltage" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="power" className="form-label">Battery Power</label>
                                                            <input type="text" required value={power} onChange={(e) => setPower(e.target.value)} className="form-control" id="power" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="fee" className="form-label">Battery Fee</label>
                                                            <input type="text" required value={fee} onChange={(e) => setFee(e.target.value)} className="form-control" id="fee" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="dueDays" className="form-label">Battery Collection due days</label>
                                                            <input type="text" required value={collectionDays} onChange={(e) => setCollectionDays(e.target.value)} className="form-control" id="dueDays" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="dueFees" className="form-label">Battery Collection due fees</label>
                                                            <input type="text" required value={collectionFees} onChange={(e) => setCollectionFees(e.target.value)} className="form-control" id="dueFees" />
                                                        </div>
                                                        <div className="col-md-12 mt-2">
                                                            <label htmlFor="batteryDescription" className="form-label">Battery Type Description</label>
                                                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="batteryDescription" />
                                                        </div>
                                                        <div className="col-auto mt-4">
                                                            <button className="btn btn-primary" type="button" disabled={createBatteryType.isLoading} onClick={() => DoCreateType()}> {createBatteryType.isLoading ? 'Sending to server...' : 'Create Battery Type'}</button>
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
