import { Footer, GreetingText } from 'web/components'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';

import { BASE_URL } from 'web/roots';
import { DefaultLayout } from 'web/layouts'
import { ExportData } from 'web/components/utils';
import Image from 'next/image';
import Link from 'next/link';
import { apiInstance } from 'web/config';
import { apiPaginatedTypes } from 'web/types';
import { chargingStationGetApiType } from 'web/types/chargingStationType';

export const getServerSideProps: GetServerSideProps<{
    repo: apiPaginatedTypes
}> = async (context) => {
    const { req, res } = context;
    let auth: any = req.cookies?.Auth;
    auth = auth && JSON.parse(auth);
    const rep: any = await apiInstance.get(BASE_URL + 'stations/get_all', {
        headers: {
            Authorization: `Bearer ${auth?.token.access_token}`,
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

export default function ChargingStations({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [stationsData, setStationsData] = useState<chargingStationGetApiType[]>();

    useEffect(() => {
        const res: any = repo && repo?.items;

        if (res?.length > 0) {
            setStationsData(res)
        }
    }, [repo, repo?.items])

    return (
        <DefaultLayout title="Charging stations">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="All Charging stations" additionalComponent={() => (
                                        <Link href="/app/charging-stations/create" className="btn-info mx-2 waves-effect waves-light layout-rightside-btn">
                                            <p>Create Charging stations</p>
                                        </Link>
                                    )} />
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <ExportData title='All Charging Stations'>
                                                {stationsData && stationsData.length > 0 && (
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
                                                                <th>Address</th>
                                                                <th>City</th>
                                                                <th>Longitude/Latitude</th>
                                                                <th>State</th>
                                                                <th>Image</th>
                                                                <th>Autonomy charge</th>
                                                                <th>Autonomy charge time</th>
                                                                <th>Number of slots</th>
                                                                <th>Status</th>
                                                                <th>Created By</th>
                                                                <th>Created At</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {stationsData?.map((el, i) => (
                                                                <tr key={i}>
                                                                    <th scope="row">
                                                                        <div className="form-check">
                                                                            <input className="form-check-input fs-15" type="checkbox" name="checkAll" value="option1" />
                                                                        </div>
                                                                    </th>
                                                                    <td>{i + 1}</td>
                                                                    <td>{el.id}</td>
                                                                    <td>{el.name}</td>
                                                                    <td><a href="#!">{el.description}</a></td>
                                                                    <td>{el.address}</td>
                                                                    <td>{el.city}</td>
                                                                    <td>
                                                                        <span className="badge badge-soft-danger" style={{ marginRight: 10 }}>{el.longitude}</span>
                                                                        <span className="badge badge-soft-danger">{el.latitude}</span>
                                                                    </td>
                                                                    <td><span className="">{el.state}</span></td>
                                                                    <td><span className="">
                                                                        {el.image !== null && <Image alt='' src={el.image} width={70} height={70} className='rounded' />}
                                                                    </span></td>
                                                                    <td><span className="">{el.autonomy_charge}</span></td>
                                                                    <td><span className="">{el.autonomy_charge_time}</span></td>
                                                                    <td><span className="badge badge-info">{el.number_of_slots}</span></td>
                                                                    <td><span className="badge badge-soft-info">{el.status === 1 ? 'Active' : 'In Active'}</span></td>
                                                                    <td><span className="">{el.created_by}</span></td>
                                                                    <td><span className="">{el.created_at}</span></td>
                                                                    <td>
                                                                        <div className="dropdown d-inline-block">
                                                                            <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <i className="ri-more-fill align-middle"></i>
                                                                            </button>
                                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                                <li>
                                                                                    <Link href={`/app/charging-stations/${el.name}/${el.id}`}>
                                                                                        <span className="dropdown-item"><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View</span>
                                                                                    </Link>
                                                                                </li>
                                                                                <li><Link href={`/app/charging-stations/edit/${el.name.replaceAll(' ', '_')}/${el.id}`} className="dropdown-item edit-item-btn"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</Link></li>
                                                                                <li>
                                                                                    <a className="dropdown-item remove-item-btn">
                                                                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
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
