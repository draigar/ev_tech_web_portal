/* eslint-disable @next/next/no-img-element */
import { apiPaginatedTypes, filterProp, formDataType } from "web/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useFilter } from "web/hooks";
import { filterStore } from "web/store";
import "flatpickr/dist/themes/dark.css";

import Flatpickr from "react-flatpickr";


export const FilterData = (props: filterProp) => {
    const { button, filterUrl, formData, urlType } = props;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [searchQuery, setSearchQuery] = useState([]);
    const [selectedSearchData, setSelectedSearchData] = useState('');
    const [formModel, setFormModel] = useState([])
    const [selectedSearchIndex, setSelectedSearchIndex] = useState(-0);

    const { searchFilter, filterDataStates, resetAllStates, filter } = useFilter();
    const { searchResultData, filterDataResult } = filterDataStates;

    const searchData = (el: formDataType, index: number) => {
        searchFilter.mutate({ url: el.url ?? '', query: searchQuery[index] }, {})
        console.log('checking index ', index)
        setSelectedSearchIndex(index)
    }

    const setSelectedSearch = (data: any, display: string, name: string, index: number) => {
        setSelectedSearchData(data)
        handleSearchChange(index.toString(), display)
        handleInputChange(name, data)
    }

    const getFilteredResult = () => {
        // here we process the url
        let url: any = []
        // here we check
        if (urlType === 'query') {
            for (const key in formModel) {
                if (formModel[key] !== null && formModel[key] !== null) {
                    url.push(encodeURIComponent(key) + "=" + encodeURIComponent(formModel[key]))
                }
            }
            url = url.join("&");
            url = filterUrl + "?" + url;
            filter.mutate({ url: url }, {
                onSuccess: (val: apiPaginatedTypes) => {
                    if (val.total > 0) {
                        const result: any = val.items
                        filterStore.setFilterData(result, {
                            url: filterUrl,
                            from: '',
                            to: ''
                        })
                        resetAllStates()
                    } else {
                        filterStore.setFilterData([], {
                            url: filterUrl,
                            from: '',
                            to: ''
                        })
                    }
                }
            })
        }
    }

    const resetAllData = () => {
        setStartDate(new Date())
        setEndDate(new Date())
        setSearchQuery([])
        setFormModel([])
        setSelectedSearchIndex(-0)
        resetAllStates()
        filterStore.setFilterData([], {url: ''})
    }

    const handleInputChange = (name: string, value: string) => {
        setFormModel((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSearchChange = (index: string, value: string) => {
        setSearchQuery((prev) => ({
            ...prev,
            [index]: value,
        }))
    }

    useEffect(() => {

    }, [])

    return (
        <div className='row'>
            {formData.map((el, i: number) => (
                <div className="col-lg-3" key={i}>
                    {el.type === 'search' && (
                        <div className="app-search mb-3">
                            <label htmlFor="username" className="form-label">{el.label}</label>
                            <div className="position-relative">
                                <input type="text" className="form-control" value={searchQuery[i]} onChange={(e) => handleSearchChange(i.toString(), e.target.value)} style={{ backgroundColor: 'white' }} placeholder="Search..." autoComplete="off" id="search-options" />
                                <span className="mdi mdi-magnify search-widget-icon"></span>
                                {searchResultData && searchResultData.length > 0 && selectedSearchIndex === i ? (
                                    <span onClick={() => { resetAllStates(); handleSearchChange(i.toString(), '') }} className="mdi mdi-close-circle seaßrch-widget-icon search-widget-icon-close position-absolute" id="search-close-options" style={{ right: 12, top: 12 }}></span>
                                ) : (
                                    <button onClick={() => searchData(el, i)} type="button" className="btn btn-primary btn-sm waves-effect waves-light rounded-pill position-absolute" style={{ right: 0, top: 0 }}>
                                        <i className="mdi mdi-magnify search-widget-icon align-middle rounded-pill fs-18"></i>
                                    </button>
                                )}
                            </div>
                            {searchResultData !== undefined && searchResultData.length && selectedSearchIndex === i && (
                                <div className="dropdown-menu dropdown-menu-lg d-block" id="search-dropdown">
                                    <div data-simplebar style={{ maxHeight: '320px' }}>

                                        {el.searchType === 'user' && (
                                            <>
                                                <div className="dropdown-header mt-2">
                                                    <h6 className="text-overflow text-muted mb-2 text-uppercase">Users</h6>
                                                </div>

                                                <div className="notification-list">
                                                    {searchResultData && searchResultData.map((tl: any, t: number) => (
                                                        <a href="#" onClick={() => setSelectedSearch(tl[el?.resultId ?? 'id'], tl[el?.displayKey ?? ''], el.formKey ?? '', i)} className="dropdown-item notify-item py-2" key={t}>
                                                            <div className="d-flex">
                                                                <img src="/images/users/avatar-2.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                                <div className="flex-1">
                                                                    <h6 className="m-0">
                                                                        {el.resultData?.map((cl, i: number) => (
                                                                            <span key={i}>{tl[cl.key]}</span>
                                                                        ))}
                                                                    </h6>
                                                                    <span className="fs-11 mb-0 text-muted">{el.hasEmail && tl.email}</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </>
                                        )}

                                        {el.searchType === 'mobility' && (
                                            <>
                                                <div className="dropdown-header mt-2">
                                                    <h6 className="text-overflow text-muted mb-1 text-uppercase">Mobility Devices</h6>
                                                </div>

                                                {searchResultData && searchResultData.map((tl, t: number) => (
                                                    <a href="#" onClick={() => setSelectedSearch(tl[el?.resultId ?? 'id'], tl[el?.displayKey ?? ''], el.formKey ?? '', i)} className="dropdown-item notify-item" key={t}>
                                                        <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2"></i>
                                                        {el.resultData?.map((cl, i: number) => (
                                                            cl.key === 'dash' ? ' - ' : (<span key={i}>{tl[cl.key]}</span>)
                                                        ))}
                                                    </a>
                                                ))}
                                            </>
                                        )}

                                        {el.searchType === 'station' && (
                                            <>
                                                <div className="dropdown-header mt-2">
                                                    <h6 className="text-overflow text-muted mb-1 text-uppercase">Charging Stations</h6>
                                                </div>

                                                {searchResultData && searchResultData.map((tl, t: number) => (
                                                    <a href="#" onClick={() => setSelectedSearch(tl[el?.resultId ?? 'id'], tl[el?.displayKey ?? ''], el.formKey ?? '', i)} className="dropdown-item notify-item d-flex" key={t}>
                                                        <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2"></i>
                                                        <div className="">
                                                            {el.resultData?.map((cl, c: number) => (
                                                                cl.key === 'break' ? (<br key={c} />) : (<span key={c} className="" style={{ fontWeight: 'bold' }}> {cl.label}: <span style={{ fontWeight: 'normal' }}>{tl[cl.key]}</span></span>)
                                                            ))}
                                                        </div>
                                                    </a>
                                                ))}
                                            </>
                                        )}
                                    </div>

                                    {/* <div className="text-center pt-3 pb-1">
                                        <a href="pages-search-results.html" className="btn btn-primary btn-sm">View All Results <i className="ri-arrow-right-line ms-1"></i></a>
                                    </div> */}
                                </div>
                            )}
                        </div>
                    )}
                    {el.type === 'input' && (
                        <div className="mt-3">
                            <label htmlFor="username" className="form-label">{el.label}</label>
                            <input type="text" value={formModel[el.resultId as any]} onChange={(e) => handleInputChange(el.resultId ?? '', e.target.value)} className="form-control" id={el.label} placeholder={el.placeholder} />
                        </div>
                    )}
                    {el.type === 'datepicker' && (
                        <div className="d-flex">
                            {el.format === 'range' ? (
                                <>
                                    <div className="mt-3 d-flex flex-column">
                                        <label htmlFor="username" className="form-label">{el.label}</label>
                                        <div className="d-flex gap-2">
                                            <div className="d-flex align-items-center gap-1">
                                                <span>{el.fromLabel}</span>
                                                <Flatpickr
                                                    value={formModel[el.resultId1 as any] ?? startDate}
                                                    className="form-control"
                                                    onChange={([date]: any) => {
                                                        handleInputChange(el.resultId1 ?? '', date)
                                                    }}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center gap-1">
                                                <span>{el.toLabel}</span>
                                                <Flatpickr
                                                    value={formModel[el.resultId2 as any] ?? startDate}
                                                    className="form-control"
                                                    onChange={([date]: any) => {
                                                        handleInputChange(el.resultId2 ?? '', date)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="mt-3">
                                    <label htmlFor="username" className="form-label">{el.label}</label>
                                    <Flatpickr
                                        value={formModel[el.resultSingle as any] ?? startDate}
                                        className="form-control"
                                        onChange={([date]: any) => {
                                            handleInputChange(el.resultSingle ?? '', date)
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
            <div className="col-md-3" style={{ marginTop: 42 }}>
                <div className="d-flex gap-2">
                    <button onClick={() => getFilteredResult()} className="btn btn-primary mr-2" type="submit">{ filter.isLoading ? 'Processing...' : button.label}</button>
                    <button onClick={() => resetAllData()} className="btn btn-outline-primary" type="submit">Reset</button>
                </div>
            </div>
        </div>
    )
}