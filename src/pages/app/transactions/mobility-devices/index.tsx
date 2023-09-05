import { Footer, GreetingText } from 'web/components'
import { FilterData } from 'web/components/utils';
import { DefaultLayout } from 'web/layouts'
import { formDataType, transactionType } from 'web/types';
import { observer } from 'mobx-react'
import { filterStore } from 'web/store';
import { toJS } from 'mobx';
import dynamic from 'next/dynamic';

const MobilityTransactionsTable = dynamic(
    () => import('./transactionMobilityTable'),
    { ssr: false }
);

const MobilityTransactions = observer(() => {
    const result: transactionType[] = toJS(filterStore.filterResults);

    const filterData: formDataType[] = [
        {
            label: 'Search mobility devices',
            type: 'search',
            url: 'mobility_devices/search/',
            placeholder: 'Search by device name or code',
            formKey: 'mobility_device_id',
            resultId: 'id',
            displayKey: 'name',
            searchType: 'mobility',
            resultData: [
                {
                    key: 'name',
                    label: 'Vehicle Name'
                },
                {
                    key: 'dash',
                    label: '',
                },
                {
                    key: 'model',
                    label: 'Vehicle Model'
                },
                {
                    key: 'break',
                    label: '',
                }
            ]
        },
        {
            label: 'Time-Frame',
            type: 'datepicker',
            format: 'range',
            fromLabel: 'From',
            toLabel: 'To',
            resultId1: 'from_date',
            resultId2: 'to_date',
        },
    ]

    return (
        <DefaultLayout title="Transactions">
            <main className="main-content">
                <div className='page-content'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="h-100">
                                    <GreetingText description="All Mobility Transactions" />
                                    <div className="row">
                                        <FilterData button={{ label: 'Fetch' }} filterUrl='transactions/filtered' formData={filterData} urlType='query' />
                                        <div className="col-lg-12">
                                            <MobilityTransactionsTable result={result} />
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
})

export default MobilityTransactions;