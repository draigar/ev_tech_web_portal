import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Footer, GreetingText } from 'web/components'
import { useBatteries } from 'web/hooks'
import { DefaultLayout } from 'web/layouts'
import { BASE_URL } from 'web/roots'
import { authStore } from 'web/store'
import { apiPaginatedTypes, batteryTypeApi } from 'web/types'
import dynamic from 'next/dynamic';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { apiInstance } from 'web/config'

const DynamicDataTableComponent = dynamic(
    () => import('./batteryTypesTable'),
    { ssr: false }
);

export const getServerSideProps: GetServerSideProps<{
    repo: apiPaginatedTypes
}> = async (context) => {
    let auth: any = context.req.cookies?.Auth;
    auth = JSON.parse(auth);
    const res = await apiInstance.get(BASE_URL + 'battery_types/get_all', {
        headers: {
            Authorization: `Bearer ${auth.token.access_token}`,
        },
    });
    const repo = res.data;
    return { props: { repo } }
}

export default function BatteryType({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [batteryTypeData, setBatteryTypeData] = useState<batteryTypeApi[]>([]);

    useEffect(() => {
        const res: any = repo.items;

        if (res?.length > 0) {
            setBatteryTypeData(res)
        }
    }, [repo])


    return (
        <DefaultLayout title="Battery Types">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="View and create battery types" additionalComponent={() => (
                                        <Link href="/app/battery-types/create" className="btn-info mx-2 waves-effect waves-light layout-rightside-btn">
                                            <p>Create Battery type</p>
                                        </Link>
                                    )} />
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5 className="card-title mb-0">All Battery Types</h5>
                                                </div>
                                                <div className="card-body">
                                                    <DynamicDataTableComponent batteryTypeData={batteryTypeData} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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