import { useState } from 'react';
import { Data } from './../../node_modules/@react-google-maps/api/src/components/drawing/Data';
import { useMutation, useQuery } from "react-query"
import { http } from "web/config"
import { ErrorHelper, OpenNotification } from "web/helper";
import { apiPaginatedTypes, batteryApiType, batteryCreateType, batteryDataList, batteryTypeApi, createBatteryFormType } from "web/types";

interface UseOptions {
    fetchAllBatteries?: boolean;
    fetchBatteryTypes?: boolean;
}

export const useBatteries = (config?: UseOptions) => {
    const [totalBatteries, setTotalBatteries] = useState(0);
    const [totalBatteryType, setTotalBatteryType] = useState(0);
    const [searchResultData, setSearchResultData] = useState<batteryDataList[]>([])
    const [singleBatteryData, setSingleBatteryData] = useState<batteryDataList>();
    const [batteriesByStationData, setBatteriesByStationData] = useState<batteryDataList[]>([]);
    const [singleBatteryTypeData, setSingleBatteryTypeData] = useState<batteryTypeApi>();

    const fetchAllBatteries = useQuery(['fetchAllBatteries'], async () => {
        try {
            const req: any = await http.get('batteries/get_all');
            const res = req.data;
            return res;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    }, {
        enabled: Boolean(config?.fetchAllBatteries),
        onSuccess: (val: apiPaginatedTypes) => {
            if (val.total > 0) {
                setTotalBatteries(val.total)
            }
        }
    })

    const batteryCreation = useMutation(async (data: createBatteryFormType) => {
        try {
            const req: any = await http.post('batteries/create', data);
            const res = req.data;
            return res;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    })

    const searchBatteries = useMutation(async (data: {query: string}) => {
        try {
            const req: any = await http.get(`batteries/search/${data.query}`);
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
                setSearchResultData(result)
            } else {
                OpenNotification({
                    type: 'warning',
                    title: 'Mobility Search',
                    description: `You search for ${variables.query} returned empty`
                })
            }
        },
    })

    const fetchBatteryTypes = useQuery(['fetchBatteryTypes'],async () => {
        try {
            const req: any = await http.get('battery_types/get_all')
            const res = req.data;
            return res;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    }, {
        enabled: Boolean(config?.fetchBatteryTypes),
        onSuccess: (val: apiPaginatedTypes) => {
            if (val.total > 0) {
                setTotalBatteryType(val.total)
            }
        }
    })

    const createBatteryType = useMutation(async (data: batteryCreateType) => {
        try {
            const req: any = await http.post('battery_types/create', data);
            const res = req.data;
            return res;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    })

    const getSingleBatteryById = useMutation(async (data:{id: string}) => {
        try {
            const req: any = await http.get(`batteries/get_single/${data.id}`);
            return req.data;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    }, {
        onSuccess(data, variables, context) {
            const val = data;
            const result: any = val.data;
            if (val) {
                console.log('===============here=====================');
                console.log(result);
                console.log('====================================');
                setSingleBatteryData(result);
            } else {
                OpenNotification({
                    title: 'Single battery',
                    description: 'We could not find the selected battery',
                    type: 'warning'
                })
            }
        },
    })
    
    const getSingleBatteryTypeById = useMutation(async (data:{id: string}) => {
        try {
            const req: any = await http.get(`battery_types/get_single/${data.id}`);
            return req.data;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    }, {
        onSuccess(data, variables, context) {
            const val = data;
            const result: any = val.data;
            if (val) {
                console.log('===============here=====================');
                console.log(result);
                console.log('====================================');
                setSingleBatteryTypeData(result);
            } else {
                OpenNotification({
                    title: 'Single battery type',
                    description: 'We could not find the selected battery type',
                    type: 'warning'
                })
            }
        },
    })

    const getBatteryByStationId = useMutation(async (data:{id: string}) => {
        try {
            const req: any = await http.get(`batteries/by_station/${data.id}`);
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
            const result: any = val.items
            if (val.total > 0) {
                setBatteriesByStationData(result)
            }
        },
    })

    const updateBattery = useMutation(async (data: {rq: createBatteryFormType, id: number}) => {
        try {
            const req: any = await http.post(`batteries/update/${data.id}`, data.rq);
            return req.data;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    })
    
    const updateBatteryType = useMutation(async (data: {rq: batteryCreateType, id: number}) => {
        try {
            const req: any = await http.post(`batteries/update/${data.id}`, data.rq);
            return req.data;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    })

    return {
        fetchAllBatteries,
        batteryCreation,
        searchBatteries,
        fetchBatteryTypes,
        createBatteryType,
        batteryStates: {
            totalBatteries,
            totalBatteryType,
            searchResultData,
            singleBatteryData,
            batteriesByStationData,
            singleBatteryTypeData,
        },
        getSingleBatteryById,
        getBatteryByStationId,
        updateBatteryType,
        updateBattery,
        getSingleBatteryTypeById
    }
}