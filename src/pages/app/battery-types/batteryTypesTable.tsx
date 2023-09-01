import Link from 'next/link'
import React, { useEffect } from 'react';

import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';

// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-responsive';
import { batteryTypeApi } from 'web/types';

interface BatteryTableProp {
    batteryTypeData: batteryTypeApi[]
}

const BatteryTable = (props: BatteryTableProp) => {
    const {batteryTypeData} = props;

    useEffect(() => {
        // if (typeof window !== 'undefined') {
        //   // Initialize DataTables
        //   $('#example').DataTable();
        // }
      }, []);

    return (
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
                    <th>Voltage</th>
                    <th>Power</th>
                    <th>Fee</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {batteryTypeData?.map((el, i) => (
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
                        <td>{el.voltage}</td>
                        <td>{el.power}</td>
                        <td>{el.fee}</td>
                        <td><span className="badge badge-soft-info">{el.status === "1" ? 'Active' : 'In Active'}</span></td>
                        <td><span className="">{el.created_at}</span></td>
                        <td>
                            <div className="dropdown d-inline-block">
                                <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="ri-more-fill align-middle"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    {/* <li><a href="#!" className="dropdown-item"><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View</a></li> */}
                                    <li>
                                        <Link href={`/app/battery-types/${el.name}/${el.id}`}>
                                        <span className="dropdown-item edit-item-btn"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</span>
                                        </Link>
                                    </li>
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
    )
};

export default BatteryTable;