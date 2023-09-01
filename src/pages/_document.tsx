import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
        <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />

        <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.2.2/css/buttons.dataTables.min.css"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script src="/libs/bootstrap/js/bootstrap.bundle.min.js" strategy="lazyOnload"></Script>
        <Script src="/libs/simplebar/simplebar.min.js" strategy="lazyOnload"></Script>
        <Script src="/libs/node-waves/waves.min.js" strategy="lazyOnload"></Script>
        <Script src="/libs/feather-icons/feather.min.js" strategy="lazyOnload"></Script>
        <Script src="/js/pages/plugins/lord-icon-2.1.0.js" strategy="lazyOnload"></Script>
        <Script src="/js/plugins.js" strategy="lazyOnload"></Script>

        <Script src="/libs/apexcharts/apexcharts.min.js" strategy="lazyOnload"></Script>

        <Script src="/libs/jsvectormap/js/jsvectormap.min.js" strategy="lazyOnload"></Script>
        <Script src="/libs/jsvectormap/maps/world-merc.js" strategy="lazyOnload"></Script>

        <Script src="/libs/swiper/swiper-bundle.min.js" strategy="lazyOnload"></Script>

        <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="lazyOnload" />
        {/* <Script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js" strategy="lazyOnload" />
        <Script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js" strategy="lazyOnload" />
        <Script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js" strategy="lazyOnload" /> */}
        <Script src="https://cdn.datatables.net/buttons/2.2.2/js/dataTables.buttons.min.js" strategy="lazyOnload" />
        <Script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.print.min.js" strategy="lazyOnload" />
        <Script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.html5.min.js" strategy="lazyOnload" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js" strategy="lazyOnload" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js" strategy="lazyOnload" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js" strategy="lazyOnload" />

        {/* <Script src="js/layout.js" strategy="lazyOnload"></Script> */}

        {/* <Script src="/js/pages/dashboard-ecommerce.init.js" strategy="lazyOnload"></Script> */}

        {/* <Script src="/js/pages/datatables.init.js" strategy="lazyOnload"></Script> */}
        <Script src="/js/app.js" strategy="lazyOnload"></Script>
      </body>
    </Html>
  )
}
