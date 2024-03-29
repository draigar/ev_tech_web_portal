import { Footer, GreetingText } from 'web/components'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { apiPaginatedTypes, userType } from 'web/types';
import { useEffect, useState } from 'react';

import { BASE_URL } from 'web/roots';
import { DefaultLayout } from 'web/layouts'
import { ExportData } from 'web/components/utils';
import Image from 'next/image';
import { apiInstance } from 'web/config';

export const getServerSideProps: GetServerSideProps<{
    repo: apiPaginatedTypes
}> = async (context) => {
    const { req, res } = context;
    let auth: any = req.cookies?.Auth;
    auth = JSON.parse(auth);
    const rep: any = await apiInstance.get(BASE_URL + 'users/get_all', {
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


export default function Users({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [userData, setUserData] = useState<userType[]>([]);

    useEffect(() => {
        const res: any = repo && repo?.items;

        if (res?.length > 0) {
            setUserData(res)
        }
    }, [repo, repo?.items])

  return (
    <DefaultLayout title="Users">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="View all registered users" />
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <ExportData title='All Users'>
                                                {userData && userData.length > 0 && (
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
                                                                <th data-ordering="false">Username</th>
                                                                <th>Full name</th>
                                                                <th>Phone number</th>
                                                                <th>Address</th>
                                                                <th>City</th>
                                                                <th>Image</th>
                                                                <th>Status</th>
                                                                <th>Created At</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {userData?.map((el, i) => (
                                                                <tr key={i}>
                                                                    <th scope="row">
                                                                        <div className="form-check">
                                                                            <input className="form-check-input fs-15" type="checkbox" name="checkAll" value="option1" />
                                                                        </div>
                                                                    </th>
                                                                    <td>{i + 1}</td>
                                                                    <td>{el.id}</td>
                                                                    <td>{el.username}</td>
                                                                    <td><a href="#!">{el.first_name} {el.last_name}</a></td>
                                                                    <td>{el.phone_number}</td>
                                                                    <td>{el.address}</td>
                                                                    <td>{el.city}</td>
                                                                    <td><span className="">
                                                                        {el.passport !== null && <Image alt='' src={el.passport} width={70} height={70} className='rounded' />}
                                                                    </span></td>
                                                                    <td><span className="badge badge-soft-info">{el.status === 1 ? 'Active' : 'In Active'}</span></td>
                                                                    <td><span className="">{el.created_at}</span></td>
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
