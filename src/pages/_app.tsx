import 'web/styles/globals.css'
import 'web/assets/libs/jsvectormap/css/jsvectormap.min.css'
import 'web/assets/libs/swiper/swiper-bundle.min.css'
// import 'web/assets/js/layout.js'
import 'web/assets/css/bootstrap.min.css'
import 'web/assets/css/icons.min.css'
import 'web/assets/css/app.min.css'
import 'web/assets/css/custom.min.css'

import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { rootClientQuery } from 'web/config'
import { ToastContainer } from 'react-toastify'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={rootClientQuery}>
      <ToastContainer />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}
