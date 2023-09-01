export interface transactionType {
    id: number,
    user_id: number,
    wallet_id: number,
    log_id: number,
    station_id: number,
    mobility_device_id: number,
    reference: string,
    external_reference: string,
    external_source: string,
    transaction_type: number,
    amount: number,
    fee: number,
    total_amount: number,
    balance: number,
    is_battery: number,
    status: number,
    created_at: string,
    updated_at: string,
    username: string,
    email: string,
    phone_number: string,
    first_name: string,
    other_name: string,
    last_name: string,
    address: string,
    gender: string,
    city: string,
    state: string,
    postal_code: string,
    nationality: string,
    bvn: string,
    nin: string,
    drivers_licence_number: string,
    drivers_licence_photo: string,
    passport: string,
    signature: string,
    station_code: string,
    station_name: string,
    station_description: string,
    station_address: string,
    station_city: string,
    station_state: string,
    station_latitude: string,
    station_longitude: string,
    station_number_of_slots: string,
    mobility_device_code: string,
    mobility_device_name: string,
    mobility_device_model: string,
    mobility_device_registration_number: string,
    mobility_device_vin: string,
    mobility_device_latitude: string,
    mobility_device_longitude: string,
    mobility_device_conversion_date: string
}