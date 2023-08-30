export interface batteryDataList {
    id: number;
    name: string;
    description?: string;
    code: string;
    voltage: string;
    temperature: string;
    charge: string;
    latitude: string;
    longitude: string;
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
    code: string;
    description: string;
    type_id: number;
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
    name: string,
    description: string,
    voltage: string,
    power: string,
    fee: number,
    collection_due_days: number,
    collection_due_fees: number
}