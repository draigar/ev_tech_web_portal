import 'web/styles/globals.css'
import 'web/assets/libs/jsvectormap/css/jsvectormap.min.css'
import 'web/assets/libs/swiper/swiper-bundle.min.css'
// import 'web/assets/js/layout.js'
import 'web/assets/css/bootstrap.min.css'
import 'web/assets/css/icons.min.css'
import 'web/assets/css/app.min.css'
import 'web/assets/css/custom.min.css'

import 'animate.css';

import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { rootClientQuery } from 'web/config'
import { ToastContainer } from 'react-toastify'
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from 'web/components/utils'

export default function App({ Component, pageProps }: AppProps) {

  const errorHandler = (error: Error, info: { componentStack: string }) => {
    /* Log the error to an error reporting service */
    console.log('ERROR_BOUNDARY', error, info);
  }

  return (
    <>
      <QueryClientProvider client={rootClientQuery}>
        <ErrorBoundary onError={errorHandler} FallbackComponent={ErrorFallback}>
          <ToastContainer />
          <Component {...pageProps} />
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  )
}
