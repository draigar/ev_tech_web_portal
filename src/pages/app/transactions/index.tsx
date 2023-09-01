import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';
import { Footer, GreetingText } from 'web/components'
import { ExportData } from 'web/components/utils';
import { apiInstance } from 'web/config';
import { formatter } from 'web/helper';
import { DefaultLayout } from 'web/layouts'
import { BASE_URL } from 'web/roots';
import { apiPaginatedTypes, transactionType } from 'web/types';

export const getServerSideProps: GetServerSideProps<{
    repo: apiPaginatedTypes
}> = async (context) => {
    let auth: any = context.req.cookies?.Auth;
    auth = JSON.parse(auth);
    const res = await apiInstance.get(BASE_URL + 'transactions/get_all', {
        headers: {
            Authorization: `Bearer ${auth.token.access_token}`,
        },
    });
    const repo = res.data;
    return { props: { repo } }
}

export default function Transactions({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [transData, setTransData] = useState<transactionType[]>([])

    useEffect(() => {
        const res: any = repo.items;

        if (res?.length > 0) {
            setTransData(res)
        }
    }, [])

  return (
    <DefaultLayout title="Transactions">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="All Transactions" />
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <ExportData title='All Transactions'>
                                                {transData && transData.length > 0 && (
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
                                                                <th data-ordering="false">Transaction Date</th>
                                                                <th>Amount</th>
                                                                <th>Fee</th>
                                                                <th>Balance</th>
                                                                <th>Is Battery</th>
                                                                <th>Beneficiary</th>
                                                                <th>Status</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {transData?.map((el, i) => (
                                                                <tr key={i}>
                                                                    <th scope="row">
                                                                        <div className="form-check">
                                                                            <input className="form-check-input fs-15" type="checkbox" name="checkAll" value="option1" />
                                                                        </div>
                                                                    </th>
                                                                    <td>{i + 1}</td>
                                                                    <td>{el.id}</td>
                                                                    <td>{el.created_at}</td>
                                                                    <td><a href="#!">₦{formatter.FormatCurrencySimple(el.amount)}</a></td>
                                                                    <td>{el.fee}</td>
                                                                    <td>₦{formatter.FormatCurrencySimple(el.balance)}</td>
                                                                    <td><span className="">{el.is_battery === 1 ? 'Battery' : 'Not battery'}</span></td>
                                                                    <td><span className="">{el.first_name} {el.last_name}</span></td>
                                                                    <td><span className="badge badge-soft-info">{el.status === 1 ? 'Active' : 'In Active'}</span></td>
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
                                                                                </li>
                                                                                <li><a className="dropdown-item edit-item-btn"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</a></li>
                                                                                <li>
                                                                                    <a className="dropdown-item remove-item-btn">
                                                                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                                                                                    </a>
                                                                                </li> */}
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
