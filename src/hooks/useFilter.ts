import { useState } from "react";
import { useMutation } from "react-query"
import { http } from "web/config"
import { ErrorHelper, OpenNotification } from "web/helper";
import { apiPaginatedTypes, apiTypes } from "web/types";

export const useFilter = () => {
    const [searchResultData, setSearchResultData] = useState([])
    const [filterDataResult, setFilterDataResult] = useState<[]>([])

    const resetAllStates = () => {
        setSearchResultData([])
    }

    const searchFilter = useMutation(async (data: { url: string; query: string; }) => {
        try {
            const req: any = await http.get(data.url + data.query)
            return req.data;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    }, {
        onSuccess(data, variables, context) {
            const val: apiPaginatedTypes = data;
            const searchQuery = variables.query
            if (val.total > 0) {
                const result: any = val.items;
                setSearchResultData(result)
            } else {
                OpenNotification({
                    type: 'warning',
                    title: 'Search filter',
                    description: `Your search for ${searchQuery} returned empty`
                })
            }
        },
    })

    const filter = useMutation(async (data: { url: string }) => {
        try {
            const req: any = await http.get(data.url)
            return req.data
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    }, {
        onSuccess: (val: apiPaginatedTypes) => {
            if (val.total > 0) {
                const result: any = val.items
                setFilterDataResult(result)
            } else {
                OpenNotification({
                    type: 'warning',
                    title: 'Filter Result',
                    description: 'Your filter returned empty'
                })
            }
        }
    })

    return {
        searchFilter,
        filterDataStates: {
            searchResultData,
            filterDataResult
        },
        resetAllStates,
        filter,
    }
}