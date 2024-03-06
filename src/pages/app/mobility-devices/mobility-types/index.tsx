import { Footer, GreetingText } from 'web/components'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { apiPaginatedTypes, apiTypes, mobilityDeviceType } from 'web/types';
import { useEffect, useState } from 'react';

import { BASE_URL } from 'web/roots';
import Cookies from "js-cookie";
import { DefaultLayout } from 'web/layouts'
import { ExportData } from 'web/components/utils';
import Link from 'next/link';
import { OpenNotification } from 'web/helper';
import { apiInstance } from 'web/config';
import { authStore } from 'web/store';
import { useMobility } from 'web/hooks';

export const getServerSideProps: GetServerSideProps<{
    repo: apiPaginatedTypes
}> = async (context) => {
    const { req, res } = context;
    let auth: any = req.cookies?.Auth;
    auth = JSON.parse(auth);
    const rep: any = await apiInstance.get(BASE_URL + 'mobility_device_types/get_all', {
        headers: {
            Authorization: `Bearer ${auth.token.access_token}`,
        },
    });
    if (rep.status) {
        const repo = rep.data;
        return { props: { repo } }
    } else {
        if (rep.response.status === 401) {
            res.setHeader(
                'Set-Cookie',
                'Auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
            )
            const repo = {};
            return { props: { repo } }
        } else {
            const repo = {};
            return { props: { repo } }
        }
    }
}

export default function MobilityDeviceTypes({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [mobilityTypeData, setMobilityTypeData] = useState<mobilityDeviceType[]>([])
    const { states, mobilityDeviceTypes, deleteMobilityType } = useMobility();
    const { refetch, isSuccess, isFetching } = mobilityDeviceTypes;

    const DeleteMobilityDeviceType = (id: number, name: string) => {
        deleteMobilityType.mutate({ id: id }, {
            onSuccess: (val: apiTypes) => {
                if (val.status) {
                    OpenNotification({
                        type: 'success',
                        title: 'Delete Device Type',
                        description: `Mobility device ${name} has been deleted`,
                    })
                    refetch();
                } else {
                    OpenNotification({
                        type: 'error',
                        title: 'Delete Device Type',
                        description: val.message,
                    })
                }
            }
        })
    }

    useEffect(() => {
        if (repo && repo?.items) {
            const res: any = repo && repo?.items;
            if (res?.length > 0) {
                setMobilityTypeData(res)
            }
            if (isSuccess) {
                setMobilityTypeData(states.mobilityTypeData);
            }
        }
    }, [isSuccess, repo, repo?.items, states.mobilityTypeData])

    return (
        <DefaultLayout title="Mobility Device Types">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="View all mobility device types" additionalComponent={() => (
                                        <>
                                            <div className='d-flex align-items-center'>
                                                <a href='#' onClick={() => refetch()} className="btn btn-dark mx-2 btn-sm waves-effect waves-light layout-rightside-btn"><i className='las la-sync-alt '></i> {isFetching ? 'Reloading' : 'Reload'}</a>
                                                <Link href="/app/mobility-devices/mobility-types/create" className="btn-info mx-2 waves-effect waves-light layout-rightside-btn">
                                                    <p>Create Mobility Device Type</p>
                                                </Link>
                                            </div>
                                        </>
                                    )} />
                                    <ExportData title='All Mobility device types'>
                                        {mobilityTypeData && mobilityTypeData.length > 0 && (
                                            <table id="example" className="table table-bordered dt-responsive nowrap table-striped align-middle" style={{ width: '100%' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col" style={{ width: '10px' }}>
                                                            <div className="form-check">
                                                                <input className="form-check-input fs-15" type="checkbox" id="checkAll" value="option" />
                                                            </div>
                                                        </th>
                                                        <th data-ordering="false">Count.</th>
                                                        <th data-ordering="false">ID</th>
                                                        <th data-ordering="false">Name</th>
                                                        <th>Description</th>
                                                        <th>Code</th>
                                                        <th>No of Wheels</th>
                                                        <th>No of batteries</th>
                                                        <th>No required without return</th>
                                                        <th>Created By</th>
                                                        <th>Created At</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {mobilityTypeData?.map((el, i) => (
                                                        <tr key={i}>
                                                            <th scope="row">
                                                                <div className="form-check">
                                                                    <input className="form-check-input fs-15" type="checkbox" name="checkAll" value="option1" />
                                                                </div>
                                                            </th>
                                                            <td>{i + 1}</td>
                                                            <td>{el.id}</td>
                                                            <td><a href="#!">{el.name}</a></td>
                                                            <td>{el.description}</td>
                                                            <td>{el.code}</td>
                                                            <td>{el.number_of_wheels}</td>
                                                            <td><span className="">{el.number_of_batteries}</span></td>
                                                            <td><span className="">{el.number_required_without_return}</span></td>
                                                            <td><span className="badge badge-soft-info">{el.created_by}</span></td>
                                                            <td><span className="badge badge-soft-info">{el.created_at}</span></td>
                                                            <td>
                                                                <div className="dropdown d-inline-block">
                                                                    <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        <i className="ri-more-fill align-middle"></i>
                                                                    </button>
                                                                    <ul className="dropdown-menu dropdown-menu-end">
                                                                        {/* <li>
                                                                                    <Link href={`/app/charging-stations/${el.name}/${el.id}`}>
                                                                                        <span className="dropdown-item"><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View</span>
                                                                                    </Link>
                                                                                </li> */}
                                                                        <li>
                                                                            <Link href={`/app/mobility-devices/mobility-types/${el.name}/${el.id}`}>
                                                                                <span className="dropdown-item edit-item-btn"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</span>
                                                                            </Link>
                                                                        </li>
                                                                        <li>
                                                                            <a href='#' onClick={() => DeleteMobilityDeviceType(el.id, el.name)} className="dropdown-item remove-item-btn">
                                                                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> {deleteMobilityType.isLoading ? 'Deleting' : 'Delete'}
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </ExportData>
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
