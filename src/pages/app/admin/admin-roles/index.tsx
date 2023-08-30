import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Footer, GreetingText } from 'web/components'
import { ExportData } from 'web/components/utils'
import { apiInstance } from 'web/config'
import { DefaultLayout } from 'web/layouts'
import { BASE_URL } from 'web/roots'
import { adminRoles, adminTypes, apiPaginatedTypes } from 'web/types'

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

export default function AdminRoles({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [adminRoles, setAdminRoles] = useState<adminRoles[]>();

    useEffect(() => {
        const res: any = repo.items;

        if (res?.length > 0) {
            setAdminRoles(res)
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
                                        <Link href="/app/admin/admin-roles/create" className="btn-info mx-2 waves-effect waves-light layout-rightside-btn">
                                            <p>Create Admin Role</p>
                                        </Link>
                                    )} />
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <ExportData title='All Admin Roles'>
                                                {adminRoles && adminRoles.length > 0 && (
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
                                                                <th>Name</th>
                                                                <th>Description</th>
                                                                <th>Functions</th>
                                                                <th>Status</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {adminRoles?.map((el, i) => (
                                                                <tr key={i}>
                                                                    <th scope="row">
                                                                        <div className="form-check">
                                                                            <input className="form-check-input fs-15" type="checkbox" name="checkAll" value="option1" />
                                                                        </div>
                                                                    </th>
                                                                    <td>{i + 1}</td>
                                                                    <td>{el.id}</td>
                                                                    <td>{el?.name}</td>
                                                                    <td>{el?.description}</td>
                                                                    <td>{el.functions}</td>
                                                                    <td><span className="badge badge-soft-info">{el.status}</span></td>
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
