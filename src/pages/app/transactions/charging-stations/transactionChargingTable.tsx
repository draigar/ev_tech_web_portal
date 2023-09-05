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
                    'Station Code': el.station_code,
                    'Station Name': el.station_name,
                    'Station Address': el.station_address,
                    'Station No of Slots': el.station_number_of_slots
                })
            })
            setDataToExport(res)
            console.log('testing', dataToExport)
        }
    }, [result]);

    return (
        <ExportData title='All Mobility Transactions' jsonSheet={dataToExport} fileName='Charging station data'>
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
                            <th>Station Code</th>
                            <th>Station Name</th>
                            <th>Station Address</th>
                            <th>Station No of Slots</th>
                            <th>Status</th>
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
                                <td>{el.station_code}</td>
                                <td><a href="#!">{el.station_name}</a></td>
                                <td>{el.station_address}</td>
                                <td>{el.station_number_of_slots}</td>
                                <td><span className="badge badge-soft-info">{el.status === 1 ? 'Active' : 'In Active'}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </ExportData>
    )
}
export default TransactionMobilityTable;