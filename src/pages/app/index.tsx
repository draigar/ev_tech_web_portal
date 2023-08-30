/* eslint-disable react/no-unescaped-entities */
import { DashboardMap, Footer, GreetingText } from 'web/components'
import { DefaultLayout } from 'web/layouts'
import { config } from 'web/store'
import dynamic from "next/dynamic";
import { useBatteries } from 'web/hooks';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { apiPaginatedTypes } from 'web/types';
import { apiInstance } from 'web/config';
import { BASE_URL } from 'web/roots';
import { useEffect } from 'react';
// import TmpMap from 'web/components/ui/map/tmpHereMap';

export const getServerSideProps: GetServerSideProps<{
  repo: apiPaginatedTypes
}> = async (context) => {
  let auth: any = context.req.cookies?.Auth;
  auth = JSON.parse(auth);
  let countData: Record<string, number> = {};
  const req = await apiInstance.get(BASE_URL + 'battery_types/get_all', {
    headers: {
      Authorization: `Bearer ${auth.token.access_token}`,
    },
  });
  const res: apiPaginatedTypes = req.data;
  countData['batteryTotal'] = res.total;

  const req2 = await apiInstance.get(BASE_URL + 'stations/get_all', {
    headers: {
      Authorization: `Bearer ${auth.token.access_token}`,
    },
  });

  const res2: apiPaginatedTypes = req2.data;
  countData['stationTotal'] = res2.total;

  // console.log('from server ', countData);
  
  return { props: { countData } }
}

export default function Home({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const { states } = useBatteries({ fetchAllBatteries: true });
  const { totalBatteries } = states;

  useEffect(() => {
    // console.log('checking ', repo);
    
  }, [repo])


  // const HereDashboardMap = dynamic(() => import("../../components/ui/map/HereDashboardMap"), {
  //   ssr: false,
  // });

  // const TmpMap = dynamic(() => import("../../components/ui/map/tmpHereMap"), {
  //   ssr: false,
  // });

  const Section1 = () => {
    return (
      <div className="row">
        <div className="col">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Daily Swaps</p>
                </div>
                <div className="flex-shrink-0">
                  {/* <h5 className="text-danger fs-14 mb-0">
                    <i className="ri-arrow-right-down-line fs-13 align-middle"></i> -3.57 %
                  </h5> */}
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="36894">0</span></h4>
                  {/* <a href="#" className="text-decoration-underline">View all orders</a> */}
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-info rounded fs-3">
                    <i className="bx bxs-car-battery text-info"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Transactions</p>
                </div>
                <div className="flex-shrink-0">
                  {/* <h5 className="text-success fs-14 mb-0">
                    <i className="ri-arrow-right-up-line fs-13 align-middle"></i> +16.24 %
                  </h5> */}
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">₦<span className="counter-value" data-target="559.25">0</span>k </h4>
                  {/* <a href="#" className="text-decoration-underline">View net earnings</a> */}
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-success rounded fs-3">
                    <i className="bx bx-list-ol text-success"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Charging stations</p>
                </div>
                <div className="flex-shrink-0">
                  {/* <h5 className="text-success fs-14 mb-0">
                    <i className="ri-arrow-right-up-line fs-13 align-middle"></i> +29.08 %
                  </h5> */}
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="12.35">0</span>K </h4>
                  {/* <a href="#" className="text-decoration-underline">See details</a> */}
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-warning rounded fs-3">
                    <i className="bx bx-user-circle text-warning"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0"> Batteries</p>
                </div>
                <div className="flex-shrink-0">
                  {/* <h5 className="text-muted fs-14 mb-0">
                      +0.00 %
                    </h5> */}
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="126">0</span>k </h4>
                  {/* <a href="#" className="text-decoration-underline">Withdraw money</a> */}
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-primary rounded fs-3">
                    <i className="bx bx-wallet text-primary"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0"> Active Vehicles</p>
                </div>
                <div className="flex-shrink-0">
                  {/* <h5 className="text-muted fs-14 mb-0">
                      +0.00 %
                    </h5> */}
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="23.89">0</span>k </h4>
                  {/* <a href="#" className="text-decoration-underline">Withdraw money</a> */}
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-soft-primary rounded fs-3">
                    <i className="bx bx-wallet text-primary"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <DefaultLayout title={'Welcome to ' + config.AppName}>
      <div className="main-content">

        <div className='page-content'>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="h-100">
                  <GreetingText description="Here's what's happening with the charging stations today." />
                  <Section1 />

                  <div className='row'>
                    <div className="col-xl-12 col-md-12">
                      <div className="card card-animate">
                        <div className="card-body" style={{ height: '600px', zIndex: 9000, padding: 0 }}>
                          <DashboardMap />
                          {/* <HereDashboardMap /> */}
                          {/* <TmpMap /> */}
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
      </div>
    </DefaultLayout>
  )
}
