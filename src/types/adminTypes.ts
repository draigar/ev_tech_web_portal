export interface adminTypes {
    id: 0,
    username: string,
    phone_number: string,
    email: string,
    first_name: string,
    other_name: string,
    last_name: string,
    address: string,
    gender: string,
    avatar: string,
    role: adminRoles,
    created_at: string
}

export interface adminRoles {
    id: 0,
    name: string,
    description: string,
    functions: string,
    status: 0
}

export interface createAdminFormType {
    role_id: number,
    username: string,
    email: string,
    phone_number: string,
    password: string
}

export interface createAdminRoleFormType {
    name: string,
    description: string,
    functions: string
}