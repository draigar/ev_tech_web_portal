import { Footer, GreetingText } from 'web/components'
import { FilterData } from 'web/components/utils';
import { DefaultLayout } from 'web/layouts'
import { formDataType, transactionType } from 'web/types';
import { observer } from 'mobx-react'
import { filterStore } from 'web/store';
import { toJS } from 'mobx';
import dynamic from 'next/dynamic';

const TransactionUsersTable = dynamic(
    () => import('./transactionUsersTable'),
    { ssr: false }
);

const UserTransactions = observer(() => {
    const result: transactionType[] = toJS(filterStore.filterResults);

    const filterData: formDataType[] = [
        {
            label: 'Search user',
            type: 'search',
            url: 'users/search/',
            placeholder: 'Search users by user id',
            formKey: 'user_id',
            resultId: 'id',
            displayKey: 'username',
            searchType: 'user',
            hasEmail: true,
            hasImage: true,
            resultData: [
                {
                    key: 'first_name',
                    label: 'First name'
                },
                {
                    key: 'last_name',
                    label: 'Last Name'
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
                                    <GreetingText description="All User Transactions" />
                                    <div className="row">
                                        <FilterData button={{ label: 'Fetch' }} filterUrl='transactions/filtered' formData={filterData} urlType='query' />
                                        <div className="col-lg-12">
                                            <TransactionUsersTable result={result} />
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

export default UserTransactions;