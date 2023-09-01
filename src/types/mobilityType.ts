export interface mobilityType {
    id: number
    user_id: number
    device_type_id: number
    code: string,
    name: string,
    model: string,
    registration_number: string,
    vin: string,
    latitude: string,
    longitude: string,
    conversion_date: string,
    front_image: string,
    left_image: string,
    right_image: string,
    back_image: string,
    status: number
    created_at: string,
    type_name: string,
    type_code: string,
    type_description: string,
    number_of_wheels: number
    number_of_batteries: number
    username: string,
    email: string,
    phone_number: string,
    customer_full_name: string,
    customer_address: string,
    created_by: string
}

export interface mobilityDeviceType {
    id: number,
    name: string,
    code: string,
    description: string,
    number_of_wheels: number,
    number_of_batteries: number,
    number_required_without_return: number,
    created_by: number,
    created_at: string
}

export interface mobilityDeviceCreateType {
    name: string,
    description: string,
    number_of_wheels: number,
    number_of_batteries: number,
    number_required_without_return: number
}