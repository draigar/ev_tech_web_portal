import { Footer, GreetingText } from 'web/components'
import { apiPaginatedTypes, apiTypes, mobilityDeviceCreateType, mobilityDeviceType } from 'web/types';
import { useCallback, useEffect, useState } from 'react';

import { DefaultLayout } from 'web/layouts'
import { LogoSpinnerLoader } from 'web/components/utils';
import { OpenNotification } from 'web/helper';
import { useMobility } from 'web/hooks';
import { useRouter } from 'next/router'

export default function EditMobilityType() {
    const router = useRouter();
    const queryData = router.query.edit;
    const id = queryData && queryData[1];

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [number_of_wheels, setWheels] = useState('');
    const [number_of_batteries, setBatteries] = useState('');
    const [number_required_without_return, setReturn] = useState('');

    const { updateMobilityDeviceTypes, getSingleMobilityType, states } = useMobility();
    const { mobilityTypeSingleData } = states;

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
            updateMobilityDeviceTypes.mutate({ rq: payload, id: queryData && queryData[1] }, {
                onSuccess: (val: apiTypes) => {
                    if (val.status) {
                        OpenNotification({
                            type: 'success',
                            title: 'Update mobility type',
                            description: `Mobility device ${name} has been updated`
                        })
                        resetData();
                        router.push('/app/mobility-devices/mobility-types')
                    } else {
                        OpenNotification({
                            type: 'error',
                            title: 'Update mobility type',
                            description: val.message
                        })
                    }
                }
            })
        }
    }

    const getSingle = useCallback(async () => {
        if (id) {
            const result = mobilityTypeSingleData
            if (result) {
                console.log('====================================');
                console.log(result);
                console.log('====================================');
                const data: any = result;
                setName(data.name);
                setDescription(data.description);
                setWheels(data.number_of_wheels.toString());
                setBatteries(data.number_of_batteries.toString());
                setReturn(data.number_required_without_return.toString());
            }
        }
    }, [id, mobilityTypeSingleData])

    useEffect(() => {
        getSingleMobilityType.mutate({ id: queryData && queryData[1] })
    }, [queryData])

    useEffect(() => {
        getSingle()
    }, [getSingle])

    return (
        <DefaultLayout title={`Edit mobility type - ${queryData && queryData[0]}`}>
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description={`Edit mobility type - ${queryData && queryData[0]}`} />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card card-animate position-relative">
                                                {getSingleMobilityType.isLoading ? <LogoSpinnerLoader /> : null}
                                                <p></p>
                                                <div className="card-body">
                                                    <p>Create your battery data</p>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <label htmlFor="name" className="form-label">Mobility Type Name</label>
                                                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" />
                                                        </div>
                                                        {/* <div className="col-lg-12 mt-2">
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
                                                        </div> */}
                                                        <div className="col-md-12 mt-2">
                                                            <label htmlFor="batteryDescription" className="form-label">Mobility Type Description</label>
                                                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="batteryDescription" />
                                                        </div>
                                                        <div className="col-auto mt-4">
                                                            <button className="btn btn-primary" type="button" disabled={updateMobilityDeviceTypes.isLoading} onClick={() => DoCreateType()}> {updateMobilityDeviceTypes.isLoading ? 'Sending to server...' : 'Create Mobility Type'}</button>
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
