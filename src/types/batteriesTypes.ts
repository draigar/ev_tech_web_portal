export interface batteryDataList {
    id: number
    type_id: number
    code: string,
    name: string,
    description: string,
    qr_code: string,
    voltage: string,
    temperature: string,
    charge: string,
    humidity: string,
    electric_current: string,
    latitude: string,
    longitude: string,
    customer_id: number
    customer_full_name: string,
    customer_address: string,
    station_name: string,
    station_address: string,
    station_id: number
    mobility_device_code: string,
    mobility_device_name: string,
    mobility_device_type: number
    mobility_device_model: string,
    mobility_device_registration_number: string,
    mobility_device_vin: string,
    mobility_device_id: number
    battery_type_name: string,
    created_at: string
    status: 0 | 1 | 2 | 3 | 4; // 0 idle , 1 in use, 2 powered, 3 charging, 4 hot listed
}

export interface batteryApiType {
    id: number,
    code: string,
    voltage: string,
    temperature: string,
    charge: string,
    latitude: string,
    longitude: string,
    status: number,
    created_by: number,
    created_at: string
}

export interface createBatteryFormType {
    name: string;
    code?: string;
    description?: string;
    type_id?: number;
    status?: number;
}

export interface batteryTypeApi {
    id: number,
    name: string,
    description: string,
    voltage: number,
    power: number,
    fee: number,
    status: string,
    created_at: string
}

export interface batteryCreateType {
    code?: string,
    name: string,
    description: string,
    voltage: string,
    power: string,
    fee: number,
    collection_due_days: number,
    collection_due_fees: number,
    status?: number,
}