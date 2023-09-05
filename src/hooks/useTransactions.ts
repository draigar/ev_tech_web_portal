import { useState } from "react";
import { useMutation, useQuery } from "react-query"
import { http } from "web/config"
import { ErrorHelper, OpenNotification } from "web/helper"
import { apiPaginatedTypes, transactionType } from "web/types";

interface useOption {
    fetchAllTransactions?: boolean;
}

export const useTransactions = (config?: useOption) => {
    const [transactionsData, setTransactionsData] = useState<transactionType[]>([])

    const getAllTransactions = useQuery(['getAllTransactions'],async () => {
        try {
            const req: any = await http.get('transactions/get_all')
            return req.data;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    }, {
        enabled: Boolean(config?.fetchAllTransactions),
        onSuccess: (val:apiPaginatedTypes) => {
            if (val.total > 0) {
                const result: any = val.items;
                setTransactionsData(result)
            }
        }
    })

    // const filterTransactions = useMutation(async (data:{}) => {
    //     try {
    //         const req: any = await http.get(`transactions/filtered?user_id=${}&station_id=${}
    //         &mobility_device_id=${}&from_date=${}&to_date=${}&page=${}&size=${}`);
    //         return req.data;
    //     } catch (e: any) {
    //         console.log(e);
    //         const error = e?.response.data;
    //         ErrorHelper(error?.errors);
    //         throw e;
    //     }
    // }, {
    //     onSuccess: (val: apiPaginatedTypes) => {
    //         if (val.total > 0) {
    //             const result: any = val.items;
    //             console.log('====================================');
    //             console.log(result);
    //             console.log('====================================');
    //         } else {
    //             OpenNotification({
    //                 type: 'warning',
    //                 title: 'Transactions Filter',
    //                 description: val.messages,
    //             })
    //         }
    //     }
    // })

    return {
        getAllTransactions,
        transactionStates: {}
    }
}