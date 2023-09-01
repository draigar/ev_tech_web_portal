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
    slots: slotsType[],
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

export interface slotsType {
    id: number,
    station_id: number,
    battery_id: number,
    status: number,
    created_at: string,
    updated_at: string,
    station_name: string,
    station_address: string,
    battery_name: string,
    battery_code: string,
    battery_description: string,
    battery_voltage: string,
    battery_temperature: string,
    battery_charge: string,
    battery_humidity: string,
    battery_electric_current: string,
    battery_status: 0
    slot_number: number,
}