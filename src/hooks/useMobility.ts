import { useState } from "react"
import { useMutation, useQuery } from "react-query";
import { http } from "web/config";
import { ErrorHelper, OpenNotification } from "web/helper";
import { apiPaginatedTypes, mobilityType } from "web/types";

interface UseOptions {
    fetchAllMobilityDevices?: boolean;
}

export const useMobility = (config?: UseOptions) => {

    const [mobilityTotal, setMobilityTotal] = useState(0);
    const [mobilityData, setMobilityData] = useState<mobilityType[]>([])
    const [mobilitySearchData, setMobilitySearchData] = useState<mobilityType[]>([])

    const fetchMobilityDevice = useQuery(['fetchMobilityDevice'],async () => {
        try {
            const req: any = await http.get('')
            return req.data;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    }, {
        enabled: Boolean(config?.fetchAllMobilityDevices),
        onSuccess: (val: apiPaginatedTypes) => {
            if (val.total > 0) {
                const result: any = val.items;
                setMobilityTotal(val.total);
                setMobilityData(result);
            }
        }
    })

    const searchMobilityDevices = useMutation(async (data: {query: string}) => {
        try {
            const req: any = await http.get(`mobility_devices/search/${data.query}`);
            const res = req.data;
            return res;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    }, {
        onSuccess(data, variables, context) {
            const val: apiPaginatedTypes = data;
            if (val.total > 0) {
                const result: any = val.items;
                setMobilitySearchData(result);
            } else {
                OpenNotification({
                    type: 'warning',
                    title: 'Mobility Search',
                    description: `You search for ${variables.query} returned empty`
                })
            }
        },
    })

    return {
        fetchMobilityDevice,
        states: {
            mobilityTotal,
            mobilityData,
            mobilitySearchData
        },
        searchMobilityDevices,
    }
}