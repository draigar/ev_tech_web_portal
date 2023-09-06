import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';

import $ from 'jquery';
import { ExportData } from 'web/components/utils';
import { useEffect, useState } from 'react';
import { transactionType } from 'web/types';
import Image from 'next/image';
import { formatter } from 'web/helper';

interface UsersTableProp {
    result: transactionType[]
}

const TransactionMobilityTable = (props: UsersTableProp) => {
    const { result } = props;
    const [dataToExport, setDataToExport] = useState([])

    const isServer = typeof window === 'undefined';
    const isBrowser = process.browser;

    useEffect(() => {
        if (!isServer && isBrowser) {
            // Initialize DataTables
            import('datatables.net').then((dataTables) => {
                // Initialize DataTables here
                import('datatables.net-responsive').then((dataTables) => {
                    $('#example').DataTable();
                })
            });
        }

        if (result) {
            let res: any = []
            result.map((el) => {
                res.push({
                    'Transaction Date': el.created_at,
                    'Reference': el.reference,
                    'First Name': el.first_name,
                    'Other Name': el.other_name,
                    'Last Name': el.last_name,
                    'Amount': el.amount,
                    'Mobility Device Code': el.mobility_device_code,
                    'Mobility Device Name': el.mobility_device_name,
                    'Mobility Device Model': el.mobility_device_model,
                    'Device Reg Number': el.mobility_device_registration_number,
                    'Conversion date': el.mobility_device_conversion_date,
                })
            })
            setDataToExport(res)
            console.log('testing', dataToExport)
        }
    }, [result]);

    return (
        <ExportData title='All Mobility Transactions' jsonSheet={dataToExport} fileName='Mobility device data' hasExcel={true}>
            {result && result.length > 0 && (
                <table id="example" className="table table-bordered dt-responsive nowrap table-striped align-middle" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '10px' }}>
                                <div className="form-check">
                                    <input placeholder='Search result data here' className="form-check-input fs-15" type="checkbox" id="checkAll" value="option" />
                                </div>
                            </th>
                            <th data-ordering="false">Count.</th>
                            <th data-ordering="false">Transaction Date</th>
                            <th data-ordering="false">Reference</th>
                            <th>Beneficiary</th>
                            <th>Amount</th>
                            <th>Mobility Code</th>
                            <th>Mobility Name</th>
                            <th>Mobility Model</th>
                            <th>Mobility Reg Number</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result?.map((el, i) => (
                            <tr key={i}>
                                <th scope="row">
                                    <div className="form-check">
                                        <input title='checkbox' placeholder='' className="form-check-input fs-15" type="checkbox" name="checkAll" value="option1" />
                                    </div>
                                </th>
                                <td>{i + 1}</td>
                                <td>{el.created_at}</td>
                                <td>{el.reference}</td>
                                <td><span className="">{el.first_name} {el.last_name}</span></td>
                                <td>₦{formatter.FormatCurrencySimple(el.amount)}</td>
                                <td>{el.mobility_device_code}</td>
                                <td><a href="#!">{el.mobility_device_name}</a></td>
                                <td>{el.mobility_device_model}</td>
                                <td>{el.mobility_device_registration_number}</td>
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
    )
}
export default TransactionMobilityTable;