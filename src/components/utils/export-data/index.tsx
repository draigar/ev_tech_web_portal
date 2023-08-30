import React from "react";

interface ExportDataProps {
    children: any;
    title: string;
}

export const ExportData = (props: ExportDataProps) => {

    const { children, title } = props;

    return (
        <div className="relative">
            {children ? (
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">{title}</h5>
                        <div className="d-flex justify-content-end">
                            <div className="btn-group">
                                <button type="button" className="btn btn-info waves-effect waves-light layout-rightside-btn">Actions</button>
                                <button type="button" className="btn btn-info dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Download as Excel</a></li>
                                    <li><a className="dropdown-item" href="#">Print</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        {children}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center">
                    <p>No data to display</p>
                </div>
            )}
        </div>
    )
};
