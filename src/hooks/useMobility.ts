import { useState } from "react"
import { useMutation, useQuery } from "react-query";
import { http } from "web/config";
import { ErrorHelper, OpenNotification } from "web/helper";
import { apiPaginatedTypes, apiTypes, mobilityDeviceCreateType, mobilityDeviceType, mobilityType } from "web/types";

interface UseOptions {
    fetchAllMobilityDevices?: boolean;
    fetchAllMobilityTypes?: boolean;
}

export const useMobility = (config?: UseOptions) => {

    const [mobilityTotal, setMobilityTotal] = useState(0);
    const [mobilityData, setMobilityData] = useState<mobilityType[]>([])
    const [mobilitySearchData, setMobilitySearchData] = useState<mobilityType[]>([])
    const [mobilityTypeData, setMobilityTypeData] = useState<mobilityDeviceType[]>([])
    const [mobilityTypeSingleData, setMobilityTypeSingleData] = useState<mobilityDeviceType>()

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

    const createMobilityType = useMutation(async (data: mobilityDeviceCreateType) => {
        try {
            const req: any = await http.post('mobility_device_types/create', data)
            return req.data;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    })

    const mobilityDeviceTypes = useQuery(['mobilityDeviceTypes'],async () => {
        try {
            const req: any = await http.get('mobility_device_types/get_all')
            return req.data;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    }, {
        enabled: Boolean(config?.fetchAllMobilityTypes),
        onSuccess: (val: apiPaginatedTypes) => {
            if (val.total > 0) {
                const result: any = val.items;
                setMobilityTypeData(result);
            }
        }
    })

    const deleteMobilityType = useMutation(async (data:{id: number}) => {
        try {
            const req: any = await http.delete(`mobility_device_types/delete/${data.id}`);
            return req.data;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    })

    const updateMobilityDeviceTypes = useMutation(async (data: {rq: mobilityDeviceCreateType; id: string | undefined}) => {
        try {
            const req: any = await http.post(`mobility_device_types/update/${data.id}`, data.rq);
            return req.data;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    })

    const getSingleMobilityType = useMutation(async (data: {id: string | undefined}) => {
        try {
            const req: any = await http.get(`mobility_device_types/get_single/${data.id}`);
            return req.data;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    }, {
        onSuccess: (val: apiTypes) => {
            if (val.status) {
                const result: any = val.data;
                setMobilityTypeSingleData(result);
            }
        }
    })

    return {
        fetchMobilityDevice,
        states: {
            mobilityTotal,
            mobilityData,
            mobilitySearchData,
            mobilityTypeData,
            mobilityTypeSingleData,
        },
        searchMobilityDevices,
        createMobilityType,
        mobilityDeviceTypes,
        deleteMobilityType,
        updateMobilityDeviceTypes,
        getSingleMobilityType,
    }
}