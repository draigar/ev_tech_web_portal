import { useState } from "react";
import { useMutation } from "react-query"
import { http } from "web/config"
import { ErrorHelper } from "web/helper";
import { apiTypes } from "web/types";
import { chargingStationGetApiType, createChargingStationFormType } from "web/types/chargingStationType";

export const useChargingStations = () => {
    const [stationSingleData, setStationSingleData] = useState<chargingStationGetApiType>();

    const createStation = useMutation(async (data: createChargingStationFormType) => {
        try {
            const req: any = await http.post('stations/create', data);
            const res = req.data;
            return res;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    })

    const getSingleStation = useMutation(async (data:{id: string}) => {
        try {
            const req: any = await http.get(`stations/get_single/${data.id}`)
            return req.data;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    }, {
        onSuccess(data, variables, context) {
            const val: apiTypes = data;
            if (val.status) {
                const result: any = val.data
                if (result) {
                    setStationSingleData(result)
                }
            }
        },
    })

    return {
        createStation,
        chargingStates: {
            stationSingleData,
        },
        getSingleStation
    }
}