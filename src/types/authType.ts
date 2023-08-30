export interface AuthData {
    access_token: string;
}

export interface authType {
    auth: AuthData;
    user: UserDataType;
}

export interface UserDataType {
    id: number,
    username: string,
    phone_number: string,
    email: string,
    first_name: string,
    other_name: string,
    last_name: string,
    address: string,
    gender: string,
    avatar: string,
    role: UserRole
}

export interface UserRole {
    id: number,
    name: string,
    description: string,
    functions: string,
    status: number
}

export interface LoginAdminApiType {
    access_token: string;
    id: number,
    username: string,
    phone_number: string,
    email: string,
    first_name: string,
    other_name: string,
    last_name: string,
    address: string,
    gender: string,
    avatar: string,
    role: UserRole
}