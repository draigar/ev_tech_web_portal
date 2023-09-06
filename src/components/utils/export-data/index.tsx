import React, { useEffect, useRef, useState } from "react";
import { useExportData } from "web/hooks";
import { useReactToPrint } from 'react-to-print';

interface ExportDataProps {
    children: any;
    title: string;
    jsonSheet?: any;
    sheetName?: string;
    fileName?: string;
    hasPrint?: boolean;
    hasExcel?: boolean;
}

export const ExportData = (props: ExportDataProps) => {

    const { children, title, jsonSheet, fileName, sheetName, hasExcel = true, hasPrint = true } = props;
    const { ExportToExcel } = useExportData();
    const viewComponentRef: any = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => viewComponentRef.current,
    });

    useEffect(() => {

    }, [])

    return (
        <div className="relative">
            {children ? (
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">{title}</h5>
                        <div className="d-flex justify-content-end">
                            {hasPrint && (
                                <div className="btn-group">
                                    <button type="button" className="btn btn-info waves-effect waves-light layout-rightside-btn">Export options</button>
                                    <button type="button" className="btn btn-info dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        {hasExcel && (<li><a className="dropdown-item" href="#" onClick={() => ExportToExcel(jsonSheet, fileName, sheetName)}>Download as Excel</a></li>)}
                                        {hasPrint && (<li><a onClick={handlePrint} className="dropdown-item" href="#">Print</a></li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="card-body" ref={viewComponentRef}>
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
