import Head from "next/head"
import Script from "next/script";
import { useEffect, useLayoutEffect } from "react";
import { authStore } from "web/store";
import { layoutTypes } from "web/types"

export const AuthLayout = (props: layoutTypes) => {
    const { children, title } = props;

    useEffect(() => {
        const isLoggedIn = authStore.isLoggedIn
        if (isLoggedIn) {
            window.location.href = "/app";
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
            <main id="auth-page-wrapper pt-5">
                {children}
            </main>
            
            <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="lazyOnload" />
            <Script src="/libs/bootstrap/js/bootstrap.bundle.min.js" strategy="lazyOnload"></Script>
            <Script src="/libs/simplebar/simplebar.min.js" strategy="lazyOnload"></Script>
            <Script src="/libs/node-waves/waves.min.js" strategy="lazyOnload"></Script>
            <Script src="/libs/feather-icons/feather.min.js" strategy="lazyOnload"></Script>
            <Script src="/js/pages/plugins/lord-icon-2.1.0.js" strategy="lazyOnload"></Script>
            <Script src="/js/plugins.js" strategy="lazyOnload"></Script>
        </div>
    )
}