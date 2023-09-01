import Link from 'next/link';
import { useState } from 'react'
import { Footer, GreetingText } from 'web/components'
import { OpenNotification } from 'web/helper';
import { useMobility } from 'web/hooks';
import { DefaultLayout } from 'web/layouts'
import { apiTypes, mobilityDeviceCreateType } from 'web/types';

export default function CreateMobilityType() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [number_of_wheels, setWheels] = useState('');
    const [number_of_batteries, setBatteries] = useState('');
    const [number_required_without_return, setReturn] = useState('');

    const {createMobilityType} = useMobility();

    const resetData = () => {
        setName('');
        setDescription('');
        setWheels('');
        setBatteries('');
        setReturn('');
    }

    const DoCreateType = () => {
        if (name === '' && number_of_batteries === '') {
            OpenNotification({
                type: 'warning',
                title: 'Create mobility type',
                description: 'Mobility device name and Number of batteries are required'
            })
        } else {
            const payload: mobilityDeviceCreateType = {
                name,
                description,
                number_of_batteries: parseInt(number_of_batteries, 10),
                number_of_wheels: parseInt(number_of_wheels, 10),
                number_required_without_return: parseInt(number_required_without_return, 10)
            }
            createMobilityType.mutate(payload, {
                onSuccess: (val: apiTypes) => {
                    if (val.status) {
                        OpenNotification({
                            type: 'success',
                            title: 'Create mobility type',
                            description: `Mobility device ${name} has been created`
                        })
                        resetData();
                    } else {
                        OpenNotification({
                            type: 'error',
                            title: 'Create mobility type',
                            description: val.message
                        })
                    }
                }
            })
        }
    }

    return (
        <DefaultLayout title="Create mobility type">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="Create mobility type" />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card card-animate">
                                                <div className="card-body">
                                                    <p>Create your battery data</p>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <label htmlFor="name" className="form-label">Mobility Type Name</label>
                                                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="voltage" className="form-label">Number of wheels</label>
                                                            <input type="text" required value={number_of_wheels} onChange={(e) => setWheels(e.target.value)} className="form-control" id="voltage" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="power" className="form-label">Number of batteries</label>
                                                            <input type="text" required value={number_of_batteries} onChange={(e) => setBatteries(e.target.value)} className="form-control" id="power" />
                                                        </div>
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="power" className="form-label">Number required without return</label>
                                                            <input type="text" required value={number_required_without_return} onChange={(e) => setReturn(e.target.value)} className="form-control" id="power" />
                                                        </div>
                                                        <div className="col-md-12 mt-2">
                                                            <label htmlFor="batteryDescription" className="form-label">Mobility Type Description</label>
                                                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="batteryDescription" />
                                                        </div>
                                                        <div className="col-auto mt-4">
                                                            <button className="btn btn-primary" type="button" disabled={createMobilityType.isLoading} onClick={() => DoCreateType()}> {createMobilityType.isLoading ? 'Sending to server...' : 'Create Mobility Type'}</button>
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
