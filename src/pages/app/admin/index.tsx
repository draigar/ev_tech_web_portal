import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Footer, GreetingText } from 'web/components'
import { ExportData } from 'web/components/utils'
import { apiInstance } from 'web/config'
import { DefaultLayout } from 'web/layouts'
import { BASE_URL } from 'web/roots'
import { adminTypes, apiPaginatedTypes } from 'web/types'

export const getServerSideProps: GetServerSideProps<{
    repo: apiPaginatedTypes
}> = async (context) => {
    let auth: any = context.req.cookies?.Auth;
    auth = JSON.parse(auth);
    const res = await apiInstance.get(BASE_URL + 'get_all', {
        headers: {
            Authorization: `Bearer ${auth.token.access_token}`,
        },
    });
    const repo = res.data;
    return { props: { repo } }
}

export default function Admin({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [admins, setAdmins] = useState<adminTypes[]>();

    useEffect(() => {
        const res: any = repo.items;

        if (res?.length > 0) {
            setAdmins(res)
        }
    }, [repo.items])

  return (
    <DefaultLayout title="Administration">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="Administration page" additionalComponent={() => (
                                        <Link href="/app/admin/create" className="btn-info mx-2 waves-effect waves-light layout-rightside-btn">
                                            <p>Create Admin</p>
                                        </Link>
                                    )} />
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <ExportData title="All Admins">
                                                {admins && admins.length > 0 && (
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
                                                                <th>Username</th>
                                                                <th data-ordering="false">Full Name</th>
                                                                <th>Email</th>
                                                                <th>Phone number</th>
                                                                <th>Address</th>
                                                                <th>Gender</th>
                                                                <th>Avatar</th>
                                                                <th>Role</th>
                                                                <th>Created At</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {admins?.map((el, i) => (
                                                                <tr key={i}>
                                                                    <th scope="row">
                                                                        <div className="form-check">
                                                                            <input className="form-check-input fs-15" type="checkbox" name="checkAll" value="option1" />
                                                                        </div>
                                                                    </th>
                                                                    <td>{i + 1}</td>
                                                                    <td>{el.id}</td>
                                                                    <td>{el?.username}</td>
                                                                    <td>{el?.first_name} {el?.last_name}</td>
                                                                    <td><a href="#!">{el?.email}</a></td>
                                                                    <td>{el?.phone_number}</td>
                                                                    <td>{el?.address}</td>
                                                                    <td><span className="">{el?.gender}</span></td>
                                                                    <td><span className="">
                                                                        {el.avatar !== null && <Image alt='' src={el.avatar} width={70} height={70} className='rounded' />}
                                                                    </span></td>
                                                                    <td><span className="">{el?.role?.name}</span></td>
                                                                    <td><span className="">{el?.created_at}</span></td>
                                                                    <td>
                                                                        <div className="dropdown d-inline-block">
                                                                            <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <i className="ri-more-fill align-middle"></i>
                                                                            </button>
                                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                                {/* <li><a href="#!" className="dropdown-item"><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View</a></li> */}
                                                                                <li><a className="dropdown-item edit-item-btn"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</a></li>
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
