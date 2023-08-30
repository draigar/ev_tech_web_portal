import Head from "next/head"
import Script from "next/script";
import { useEffect, useLayoutEffect } from "react";
import { Customizer, HeaderMenu, NavigationMenus } from "web/components";
import { loadScript } from "web/components/utils";
import { authStore } from "web/store";
import { layoutTypes } from "web/types"



export const DefaultLayout = (props: layoutTypes) => {
    const { children, data, pageTitle, subTitle, title } = props;

    useEffect(() => {
        Promise.all([
            loadScript('/libs/bootstrap/js/bootstrap.bundle.min.js'),
            loadScript('/libs/simplebar/simplebar.min.js'),
            loadScript('/libs/node-waves/waves.min.js'),
            loadScript('/libs/feather-icons/feather.min.js'),
            loadScript('/js/pages/plugins/lord-icon-2.1.0.js'),
            loadScript('/js/plugins.js'),
            loadScript('/libs/apexcharts/apexcharts.min.js'),
            loadScript('/libs/jsvectormap/js/jsvectormap.min.js'),
            loadScript('/libs/jsvectormap/maps/world-merc.js'),
            loadScript('/libs/swiper/swiper-bundle.min.js'),
            loadScript('/js/pages/datatables.init.js'),
            loadScript('/js/app.js'),
        ]).then(() => {})

        return () => {}
    }, [])

    useEffect(() => {

        window.sessionStorage.setItem("data-layout", "vertical");
        window.sessionStorage.setItem("data-sidebar-image", "none");
        window.sessionStorage.setItem("data-sidebar", "dark");
        window.sessionStorage.setItem("data-layout-style", "detached");
       
    }, [])

    useEffect(() => {
        const isLoggedIn = authStore.isLoggedIn
        if (!isLoggedIn) {
            window.location.href = "/auth/login";
        }
    }, [])

    return (
        <div>
            <Head>
                <title>
                    {title}
                </title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main id="layout-wrapper">
                {/* Header menu component */}
                <HeaderMenu />
                {/* removing notification modal */}
                <div id="removeNotificationModal" className="modal fade zoomIn" tabIndex={-1} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="NotificationModalbtn-close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mt-2 text-center">
                                    {/* <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style={{ width: '100px', height: '100px' }}></lord-icon> */}
                                    <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                        <h4>Are you sure ?</h4>
                                        <p className="text-muted mx-4 mb-0">Are you sure you want to remove this Notification ?</p>
                                    </div>
                                </div>
                                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                    <button type="button" className="btn w-sm btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn w-sm btn-danger" id="delete-notification">Yes, Delete It!</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Navigation menus modal */}
                <NavigationMenus />
                <div className="vertical-overlay"></div>
                {children}
            </main>
            {/* Preloader */}
            <div id="preloader">
                <div id="status">
                    <div className="spinner-border text-primary avatar-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
            <Customizer />
            {/* <Script src="/js/app.js" strategy="lazyOnload"></Script> */}
        </div>
    )
}