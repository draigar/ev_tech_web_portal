interface CustomizerProp {
    show?: boolean;
}

export const Customizer = (props: CustomizerProp) => {
    const { show } = props;
    return show ? (
        <>
            <div className="customizer-setting d-none d-md-block">
                <div className="btn-info btn-rounded shadow-lg btn btn-icon btn-lg p-2" data-bs-toggle="offcanvas" data-bs-target="#theme-settings-offcanvas" aria-controls="theme-settings-offcanvas">
                    <i className='mdi mdi-spin mdi-cog-outline fs-22'></i>
                </div>
            </div>

            <div className="offcanvas offcanvas-end border-0" tabIndex={-1} id="theme-settings-offcanvas">
                <div className="d-flex align-items-center bg-primary bg-gradient p-3 offcanvas-header">
                    <h5 className="m-0 me-2 text-white">Theme Customizer</h5>

                    <button type="button" className="btn-close btn-close-white ms-auto" id="customizerclose-btn" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body p-0">
                    <div data-simplebar className="h-100">
                        <div className="p-4">
                            <h6 className="mb-0 fw-semibold text-uppercase">Layout</h6>
                            <p className="text-muted">Choose your layout</p>

                            <div className="row gy-3">
                                <div className="col-4">
                                    <div className="form-check card-radio">
                                        <input id="customizer-layout01" name="data-layout" type="radio" value="vertical" className="form-check-input" />
                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout01">
                                            <span className="d-flex gap-1 h-100">
                                                <span className="flex-shrink-0">
                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                        <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    </span>
                                                </span>
                                                <span className="flex-grow-1">
                                                    <span className="d-flex h-100 flex-column">
                                                        <span className="bg-light d-block p-1"></span>
                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                    </span>
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                    <h5 className="fs-13 text-center mt-2">Vertical</h5>
                                </div>
                                <div className="col-4">
                                    <div className="form-check card-radio">
                                        <input id="customizer-layout02" name="data-layout" type="radio" value="horizontal" className="form-check-input" />
                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout02">
                                            <span className="d-flex h-100 flex-column gap-1">
                                                <span className="bg-light d-flex p-1 gap-1 align-items-center">
                                                    <span className="d-block p-1 bg-soft-primary rounded me-1"></span>
                                                    <span className="d-block p-1 pb-0 px-2 bg-soft-primary ms-auto"></span>
                                                    <span className="d-block p-1 pb-0 px-2 bg-soft-primary"></span>
                                                </span>
                                                <span className="bg-light d-block p-1"></span>
                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                            </span>
                                        </label>
                                    </div>
                                    <h5 className="fs-13 text-center mt-2">Horizontal</h5>
                                </div>
                                <div className="col-4">
                                    <div className="form-check card-radio">
                                        <input id="customizer-layout03" name="data-layout" type="radio" value="twocolumn" className="form-check-input" />
                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout03">
                                            <span className="d-flex gap-1 h-100">
                                                <span className="flex-shrink-0">
                                                    <span className="bg-light d-flex h-100 flex-column gap-1">
                                                        <span className="d-block p-1 bg-soft-primary mb-2"></span>
                                                        <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                    </span>
                                                </span>
                                                <span className="flex-shrink-0">
                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    </span>
                                                </span>
                                                <span className="flex-grow-1">
                                                    <span className="d-flex h-100 flex-column">
                                                        <span className="bg-light d-block p-1"></span>
                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                    </span>
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                    <h5 className="fs-13 text-center mt-2">Two Column</h5>
                                </div>

                                <div className="col-4">
                                    <div className="form-check card-radio">
                                        <input id="customizer-layout04" name="data-layout" type="radio" value="semibox" className="form-check-input" />
                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout04">
                                            <span className="d-flex gap-1 h-100">
                                                <span className="flex-shrink-0 p-1">
                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                        <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    </span>
                                                </span>
                                                <span className="flex-grow-1">
                                                    <span className="d-flex h-100 flex-column pt-1 pe-2">
                                                        <span className="bg-light d-block p-1"></span>
                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                    </span>
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                    <h5 className="fs-13 text-center mt-2">Semi Box</h5>
                                </div>
                            </div>

                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Color Scheme</h6>
                            <p className="text-muted">Choose Light or Dark Scheme.</p>

                            <div className="colorscheme-cardradio">
                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input className="form-check-input" type="radio" name="data-layout-mode" id="layout-mode-light" value="light" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="layout-mode-light">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Light</h5>
                                    </div>

                                    <div className="col-4">
                                        <div className="form-check card-radio dark">
                                            <input className="form-check-input" type="radio" name="data-layout-mode" id="layout-mode-dark" value="dark" />
                                            <label className="form-check-label p-0 avatar-md w-100 bg-dark" htmlFor="layout-mode-dark">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-soft-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-soft-light rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-soft-light d-block p-1"></span>
                                                            <span className="bg-soft-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Dark</h5>
                                    </div>
                                </div>
                            </div>

                            <div id="sidebar-visibility">
                                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar Visibility</h6>
                                <p className="text-muted">Choose show or Hidden sidebar.</p>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input className="form-check-input" type="radio" name="data-sidebar-visibility" id="sidebar-visibility-show" value="show" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-visibility-show">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0 p-1">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column pt-1 pe-2">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Show</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input className="form-check-input" type="radio" name="data-sidebar-visibility" id="sidebar-visibility-hidden" value="hidden" />
                                            <label className="form-check-label p-0 avatar-md w-100 px-2" htmlFor="sidebar-visibility-hidden">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column pt-1 px-2">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Hidden</h5>
                                    </div>
                                </div>
                            </div>

                            <div id="layout-width">
                                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Layout Width</h6>
                                <p className="text-muted">Choose Fluid or Boxed layout.</p>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input className="form-check-input" type="radio" name="data-layout-width" id="layout-width-fluid" value="fluid" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="layout-width-fluid">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Fluid</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input className="form-check-input" type="radio" name="data-layout-width" id="layout-width-boxed" value="boxed" />
                                            <label className="form-check-label p-0 avatar-md w-100 px-2" htmlFor="layout-width-boxed">
                                                <span className="d-flex gap-1 h-100 border-start border-end">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Boxed</h5>
                                    </div>
                                </div>
                            </div>

                            <div id="layout-position">
                                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Layout Position</h6>
                                <p className="text-muted">Choose Fixed or Scrollable Layout Position.</p>

                                <div className="btn-group radio" role="group">
                                    <input type="radio" className="btn-check" name="data-layout-position" id="layout-position-fixed" value="fixed" />
                                    <label className="btn btn-light w-sm" htmlFor="layout-position-fixed">Fixed</label>

                                    <input type="radio" className="btn-check" name="data-layout-position" id="layout-position-scrollable" value="scrollable" />
                                    <label className="btn btn-light w-sm ms-0" htmlFor="layout-position-scrollable">Scrollable</label>
                                </div>
                            </div>
                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Topbar Color</h6>
                            <p className="text-muted">Choose Light or Dark Topbar Color.</p>

                            <div className="row">
                                <div className="col-4">
                                    <div className="form-check card-radio">
                                        <input className="form-check-input" type="radio" name="data-topbar" id="topbar-color-light" value="light" />
                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="topbar-color-light">
                                            <span className="d-flex gap-1 h-100">
                                                <span className="flex-shrink-0">
                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                        <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    </span>
                                                </span>
                                                <span className="flex-grow-1">
                                                    <span className="d-flex h-100 flex-column">
                                                        <span className="bg-light d-block p-1"></span>
                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                    </span>
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                    <h5 className="fs-13 text-center mt-2">Light</h5>
                                </div>
                                <div className="col-4">
                                    <div className="form-check card-radio">
                                        <input className="form-check-input" type="radio" name="data-topbar" id="topbar-color-dark" value="dark" />
                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="topbar-color-dark">
                                            <span className="d-flex gap-1 h-100">
                                                <span className="flex-shrink-0">
                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                        <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    </span>
                                                </span>
                                                <span className="flex-grow-1">
                                                    <span className="d-flex h-100 flex-column">
                                                        <span className="bg-primary d-block p-1"></span>
                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                    </span>
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                    <h5 className="fs-13 text-center mt-2">Dark</h5>
                                </div>
                            </div>

                            <div id="sidebar-size">
                                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar Size</h6>
                                <p className="text-muted">Choose a size of Sidebar.</p>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-check sidebar-setting card-radio">
                                            <input className="form-check-input" type="radio" name="data-sidebar-size" id="sidebar-size-default" value="lg" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-default">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Default</h5>
                                    </div>

                                    <div className="col-4">
                                        <div className="form-check sidebar-setting card-radio">
                                            <input className="form-check-input" type="radio" name="data-sidebar-size" id="sidebar-size-compact" value="md" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-compact">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 bg-soft-primary rounded mb-2"></span>
                                                            <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Compact</h5>
                                    </div>

                                    <div className="col-4">
                                        <div className="form-check sidebar-setting card-radio">
                                            <input className="form-check-input" type="radio" name="data-sidebar-size" id="sidebar-size-small" value="sm" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-small">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1">
                                                            <span className="d-block p-1 bg-soft-primary mb-2"></span>
                                                            <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Small (Icon View)</h5>
                                    </div>

                                    <div className="col-4">
                                        <div className="form-check sidebar-setting card-radio">
                                            <input className="form-check-input" type="radio" name="data-sidebar-size" id="sidebar-size-small-hover" value="sm-hover" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-small-hover">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1">
                                                            <span className="d-block p-1 bg-soft-primary mb-2"></span>
                                                            <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Small Hover View</h5>
                                    </div>
                                </div>
                            </div>

                            <div id="sidebar-view">
                                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar View</h6>
                                <p className="text-muted">Choose Default or Detached Sidebar view.</p>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-check sidebar-setting card-radio">
                                            <input className="form-check-input" type="radio" name="data-layout-style" id="sidebar-view-default" value="default" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-view-default">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Default</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check sidebar-setting card-radio">
                                            <input className="form-check-input" type="radio" name="data-layout-style" id="sidebar-view-detached" value="detached" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-view-detached">
                                                <span className="d-flex h-100 flex-column">
                                                    <span className="bg-light d-flex p-1 gap-1 align-items-center px-2">
                                                        <span className="d-block p-1 bg-soft-primary rounded me-1"></span>
                                                        <span className="d-block p-1 pb-0 px-2 bg-soft-primary ms-auto"></span>
                                                        <span className="d-block p-1 pb-0 px-2 bg-soft-primary"></span>
                                                    </span>
                                                    <span className="d-flex gap-1 h-100 p-1 px-2">
                                                        <span className="flex-shrink-0">
                                                            <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                    <span className="bg-light d-block p-1 mt-auto px-2"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Detached</h5>
                                    </div>
                                </div>
                            </div>
                            <div id="sidebar-color">
                                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar Color</h6>
                                <p className="text-muted">Choose a color of Sidebar.</p>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-check sidebar-setting card-radio" data-bs-toggle="collapse" data-bs-target="#collapseBgGradient.show">
                                            <input className="form-check-input" type="radio" name="data-sidebar" id="sidebar-color-light" value="light" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-color-light">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-white border-end d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Light</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check sidebar-setting card-radio" data-bs-toggle="collapse" data-bs-target="#collapseBgGradient.show">
                                            <input className="form-check-input" type="radio" name="data-sidebar" id="sidebar-color-dark" value="dark" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-color-dark">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-primary d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-soft-light rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Dark</h5>
                                    </div>
                                    <div className="col-4">
                                        <button className="btn btn-link avatar-md w-100 p-0 overflow-hidden border collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBgGradient" aria-expanded="false" aria-controls="collapseBgGradient">
                                            <span className="d-flex gap-1 h-100">
                                                <span className="flex-shrink-0">
                                                    <span className="bg-vertical-gradient d-flex h-100 flex-column gap-1 p-1">
                                                        <span className="d-block p-1 px-2 bg-soft-light rounded mb-2"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                    </span>
                                                </span>
                                                <span className="flex-grow-1">
                                                    <span className="d-flex h-100 flex-column">
                                                        <span className="bg-light d-block p-1"></span>
                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                    </span>
                                                </span>
                                            </span>
                                        </button>
                                        <h5 className="fs-13 text-center mt-2">Gradient</h5>
                                    </div>
                                </div>

                                <div className="collapse" id="collapseBgGradient">
                                    <div className="d-flex gap-2 flex-wrap img-switch p-2 px-3 bg-light rounded">

                                        <div className="form-check sidebar-setting card-radio">
                                            <input className="form-check-input" type="radio" name="data-sidebar" id="sidebar-color-gradient" value="gradient" />
                                            <label className="form-check-label p-0 avatar-xs rounded-circle" htmlFor="sidebar-color-gradient">
                                                <span className="avatar-title rounded-circle bg-vertical-gradient"></span>
                                            </label>
                                        </div>
                                        <div className="form-check sidebar-setting card-radio">
                                            <input className="form-check-input" type="radio" name="data-sidebar" id="sidebar-color-gradient-2" value="gradient-2" />
                                            <label className="form-check-label p-0 avatar-xs rounded-circle" htmlFor="sidebar-color-gradient-2">
                                                <span className="avatar-title rounded-circle bg-vertical-gradient-2"></span>
                                            </label>
                                        </div>
                                        <div className="form-check sidebar-setting card-radio">
                                            <input className="form-check-input" type="radio" name="data-sidebar" id="sidebar-color-gradient-3" value="gradient-3" />
                                            <label className="form-check-label p-0 avatar-xs rounded-circle" htmlFor="sidebar-color-gradient-3">
                                                <span className="avatar-title rounded-circle bg-vertical-gradient-3"></span>
                                            </label>
                                        </div>
                                        <div className="form-check sidebar-setting card-radio">
                                            <input className="form-check-input" type="radio" name="data-sidebar" id="sidebar-color-gradient-4" value="gradient-4" />
                                            <label className="form-check-label p-0 avatar-xs rounded-circle" htmlFor="sidebar-color-gradient-4">
                                                <span className="avatar-title rounded-circle bg-vertical-gradient-4"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="sidebar-img">
                                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar Images</h6>
                                <p className="text-muted">Choose a image of Sidebar.</p>

                                <div className="d-flex gap-2 flex-wrap img-switch">
                                    <div className="form-check sidebar-setting card-radio">
                                        <input className="form-check-input" type="radio" name="data-sidebar-image" id="sidebarimg-none" value="none" />
                                        <label className="form-check-label p-0 avatar-sm h-auto" htmlFor="sidebarimg-none">
                                            <span className="avatar-md w-auto bg-light d-flex align-items-center justify-content-center">
                                                <i className="ri-close-fill fs-20"></i>
                                            </span>
                                        </label>
                                    </div>

                                    <div className="form-check sidebar-setting card-radio">
                                        <input className="form-check-input" type="radio" name="data-sidebar-image" id="sidebarimg-01" value="img-1" />
                                        <label className="form-check-label p-0 avatar-sm h-auto" htmlFor="sidebarimg-01">
                                            <img src="./images/sidebar/img-1.jpg" alt="" className="avatar-md w-auto object-cover" />
                                        </label>
                                    </div>

                                    <div className="form-check sidebar-setting card-radio">
                                        <input className="form-check-input" type="radio" name="data-sidebar-image" id="sidebarimg-02" value="img-2" />
                                        <label className="form-check-label p-0 avatar-sm h-auto" htmlFor="sidebarimg-02">
                                            <img src="./images/sidebar/img-2.jpg" alt="" className="avatar-md w-auto object-cover" />
                                        </label>
                                    </div>
                                    <div className="form-check sidebar-setting card-radio">
                                        <input className="form-check-input" type="radio" name="data-sidebar-image" id="sidebarimg-03" value="img-3" />
                                        <label className="form-check-label p-0 avatar-sm h-auto" htmlFor="sidebarimg-03">
                                            <img src="./images/sidebar/img-3.jpg" alt="" className="avatar-md w-auto object-cover" />
                                        </label>
                                    </div>
                                    <div className="form-check sidebar-setting card-radio">
                                        <input className="form-check-input" type="radio" name="data-sidebar-image" id="sidebarimg-04" value="img-4" />
                                        <label className="form-check-label p-0 avatar-sm h-auto" htmlFor="sidebarimg-04">
                                            <img src="./images/sidebar/img-4.jpg" alt="" className="avatar-md w-auto object-cover" />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div id="preloader-menu">
                                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Preloader</h6>
                                <p className="text-muted">Choose a preloader.</p>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-check sidebar-setting card-radio">
                                            <input className="form-check-input" type="radio" name="data-preloader" id="preloader-view-custom" value="enable" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="preloader-view-custom">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                                {/* <div id="preloader">
                                        <div id="status" className="d-flex align-items-center justify-content-center">
                                            <div className="spinner-border text-primary avatar-xxs m-auto" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        </div> */}
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Enable</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check sidebar-setting card-radio">
                                            <input className="form-check-input" type="radio" name="data-preloader" id="preloader-view-none" value="disable" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="preloader-view-none">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Disable</h5>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
                <div className="offcanvas-footer border-top p-3 text-center">
                    <div className="row">
                        <div className="col-6">
                            <button type="button" className="btn btn-light w-100" id="reset-layout">Reset</button>
                        </div>
                        <div className="col-6">
                            <a rel="noopener" href="https://1.envato.market/velzon-admin" target="_blank" className="btn btn-primary w-100">Buy Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : null
}