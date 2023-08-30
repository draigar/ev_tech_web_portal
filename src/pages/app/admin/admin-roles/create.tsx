import { useEffect, useState } from 'react'
import { Footer, GreetingText } from 'web/components'
import { OpenNotification } from 'web/helper';
import { useAuth } from 'web/hooks';
import { DefaultLayout } from 'web/layouts'
import { apiTypes, createAdminRoleFormType } from 'web/types';

export default function CreateAdminRoles() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [functions, setFunctions] = useState('');

    const {CreateAuthRoles} = useAuth();

    const resetRole = () => {
        setName('');
        setDescription('');
        setFunctions('');
    }

    const DoCreateRole = () => {
        if (name === '') {
            OpenNotification({
                description: 'Name is required',
                type: 'warning'
            })
        } else {
            const payload: createAdminRoleFormType = {
                description: description,
                name: name,
                functions: functions,
            }
            CreateAuthRoles.mutate(payload, {
                onSuccess: (val: apiTypes) => {
                    if (val.status) {
                        OpenNotification({
                            description: `Admin Role ${name} has been created`,
                            type: 'success'
                        })
                        resetRole();
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

    useEffect(() => {

    }, [])

    return (
        <DefaultLayout title="Create Admin Roles">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="Create admin roles" />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card card-animate">
                                                <div className="card-body">
                                                    <p>Create your admin</p>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <label htmlFor="name" className="form-label">Role Name</label>
                                                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" />
                                                        </div>
                                                        <div className="col-md-12 mt-2">
                                                            <label htmlFor="description" className="form-label">Role Description</label>
                                                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" />
                                                        </div>
                                                        <div className="col-md-12 mt-2">
                                                            <div className='row'>
                                                                <div className='col-md-6'>
                                                                    <label htmlFor="description" className="form-label">All roles</label>
                                                                    <div className='box border p-2' style={{ height: '250px', maxHeight: '250px', overflowY: 'auto' }}>
                                                                        <div className='p-1 selectable mb-1'>Dashboard</div>
                                                                        <div className='p-1 selectable mb-1 selected'>Dashboard</div>
                                                                        <div className='p-1 selectable mb-1'>Dashboard</div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-6'>
                                                                    <label htmlFor="description" className="form-label">Selected roles</label>
                                                                    <div className='box border p-2' style={{ height: '250px', maxHeight: '250px', overflowY: 'auto' }}>
                                                                        <div className='p-1 selectable mb-1'>Dashboard</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-auto mt-4">
                                                            <button className="btn btn-primary" type="button" disabled={CreateAuthRoles.isLoading} onClick={() => DoCreateRole()}> {CreateAuthRoles.isLoading ? 'Sending to server...' : 'Create Admin role'}</button>
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
