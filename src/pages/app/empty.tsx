import { Footer, GreetingText } from 'web/components'
import { DefaultLayout } from 'web/layouts'

export default function Empty() {

  return (
    <DefaultLayout title="Welcome to Empty">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="Welcome to EVTech project empty page" />
                                </div>
                            </div>
                            <div className="col-auto layout-rightside-col"></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </DefaultLayout>
  )
}
