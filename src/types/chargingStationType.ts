import { ReadStream } from "fs"

export interface chargingStationGetApiType {
    id: number,
    code: string,
    name: string,
    description: string,
    address: string,
    city: string,
    state: string,
    image: string,
    autonomy_charge: string,
    autonomy_charge_time: string,
    latitude: string,
    longitude: string,
    number_of_slots: number,
    status: number,
    created_by: number,
    created_at: string
}

export interface createChargingStationFormType {
    name: string,
    description: string,
    address: string,
    city: string,
    state: string,
    number_of_slots: number,
    image: any,
}