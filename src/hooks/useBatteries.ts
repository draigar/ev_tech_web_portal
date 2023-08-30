import { Data } from './../../node_modules/@react-google-maps/api/src/components/drawing/Data';
import { useMutation, useQuery } from "react-query"
import { http } from "web/config"
import { ErrorHelper } from "web/helper";
import { batteryCreateType, createBatteryFormType } from "web/types";

interface UseOptions {
    fetchAllBatteries?: boolean;
    fetchBatteryTypes?: boolean;
}

export const useBatteries = (config?: UseOptions) => {

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
        enabled: Boolean(config?.fetchAllBatteries),
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

    return {
        fetchAllBatteries,
        batteryCreation,
        searchBatteries,
        fetchBatteryTypes,
        createBatteryType
    }
}