import { useMutation } from "react-query"
import { http } from "web/config"
import { ErrorHelper } from "web/helper";
import { createChargingStationFormType } from "web/types/chargingStationType";

export const useChargingStations = () => {

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

    return {
        createStation,
    }
}