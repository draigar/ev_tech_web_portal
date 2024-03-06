import { DefaultButton, GreetingText } from "web/components";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { OpenNotification, formatter } from "web/helper";
import { adminRoles, apiPaginatedTypes, apiTypes, batteryTypeApi, createAdminFormType, createBatteryFormType } from "web/types";
import { useCallback, useEffect, useState } from "react";

import { BASE_URL } from "web/roots";
import { DefaultLayout } from "web/layouts";
import { apiInstance } from "web/config";
import { useAuth } from "web/hooks";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps<{
    repo: apiPaginatedTypes
}> = async (context) => {
    let auth: any = context.req.cookies?.Auth;
    auth = JSON.parse(auth);
    const res = await apiInstance.get(BASE_URL + 'roles/get_all_roles', {
        headers: {
            Authorization: `Bearer ${auth.token.access_token}`,
        },
    });
    const repo = res.data;
    return { props: { repo } }
}

export default function EditAdmin({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [role_id, setRoleId] = useState('');
    const [username, setUsername] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const { CreateAuth, fetchAllAdminRoles } = useAuth();

    const [Roles, setAdminRoles] = useState<adminRoles[]>();

    const resetAdmin = () => {
        setUsername('');
        setEmail('');
        setRoleId('0');
        setPhoneNumber('');
        setPassword('');
    }

    useEffect(() => {
        const res: any = repo && repo?.items;

        let generatedPassword = formatter.generatePassword('12', '8')
        generatedPassword = generatedPassword;
        setPassword(generatedPassword.join("").toString())

        if (res?.length > 0) {
            setAdminRoles(res)
        }
    }, [repo, repo?.items])

    const DoCreateAdmin = () => {
        if (username === '' && email === '') {
            OpenNotification({
                description: 'Username Name and Email are required',
                type: 'warning'
            })
        } else {
            const payload: createAdminFormType = {
                email: email,
                password: password,
                phone_number: phone_number,
                role_id: parseInt(role_id, 10),
                username: username,
            }
            CreateAuth.mutate(payload, {
                onSuccess: (val: apiTypes) => {
                    if (val.status) {
                        OpenNotification({
                            description: `Admin ${username} has been created`,
                            type: 'success'
                        })
                        resetAdmin();
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

    const RenderRoleType = useCallback(() => {
        const { data, status, refetch, isFetching } = fetchAllAdminRoles;
        const res: apiPaginatedTypes = data;
        const resultStatus: any = res?.items;
        const result: any = res?.items;

        if (Roles && Roles?.length > 0 || result?.length > 0) {
            return (
                <div className="col-lg-12 mt-2">
                    <label htmlFor="adminRole" className="form-label">Choose Admin Role</label>
                    <select className="form-control w-full" name="adminRole" title="Admin Role"
                        onInput={(e: any) => setRoleId(e.target.value)}>
                        <option value={0}>Choose Admin role</option>
                        {Roles && Roles.length > 0 ? (
                            Roles.map((el: adminRoles, i: number) => (
                                <option value={el.id} key={i}>{el.name}</option>
                            ))
                        ) : (
                            result.map((el: adminRoles, i: number) => (
                                <option value={el.id} key={i}>{el.name}</option>
                            ))
                        )}
                    </select>
                </div>
            )
        } else {
            return (
                <div className="col-lg-12 mt-2">
                    <label htmlFor="batteryCode" className="form-label">Choose Admin Role</label>
                    <div className="flex flex-row">
                        <p className="">We could not fetch admin role:</p>
                        <DefaultButton onClick={() => refetch()} className="btn-info mx-2 waves-effect waves-light layout-rightside-btn"> {isFetching ? 'Refetching' : 'Try again'}</DefaultButton>
                    </div>
                </div>
            )
        }
    }, [Roles, fetchAllAdminRoles])

    return (
        <DefaultLayout title="Create Admin">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="Create admin" />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card card-animate">
                                                <div className="card-body">
                                                    <p>Create your admin</p>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <label htmlFor="username" className="form-label">Admin Username</label>
                                                            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="username" />
                                                        </div>
                                                        {RenderRoleType()}
                                                        <div className="col-lg-12 mt-2">
                                                            <label htmlFor="email" className="form-label">Admin Email</label>
                                                            <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" />
                                                        </div>
                                                        <div className="col-md-12 mt-2">
                                                            <label htmlFor="phone" className="form-label">Admin Phone Number</label>
                                                            <input type="text" required value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" id="phone" />
                                                        </div>
                                                        <div className="col-md-12 mt-2">
                                                            <label htmlFor="phone" className="form-label">Generated Password</label>
                                                            <div className="d-flex gap-2 border-2 border-dotted rounded p-2" style={{backgroundColor: '#cac5c56e', borderColor: '#cac5c56e'}}>
                                                                <span>{password}</span>
                                                                <span className="rounded-full badge badge-soft-info" style={{cursor: 'pointer'}}><i className="ri-file-copy-line"></i></span>
                                                            </div>
                                                        </div>
                                                        <div className="col-auto mt-4">
                                                            <button className="btn btn-primary" type="button" disabled={CreateAuth.isLoading} onClick={() => DoCreateAdmin()}> {CreateAuth.isLoading ? 'Sending to server...' : 'Create Admin'}</button>
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