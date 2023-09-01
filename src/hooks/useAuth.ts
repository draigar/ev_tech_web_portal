import Cookies from "js-cookie";
import { useMutation, useQuery } from "react-query"
import { http } from "web/config"
import { ErrorHelper, OpenNotification } from "web/helper";
import { authStore } from "web/store";
import { AuthData, LoginAdminApiType, UserDataType, apiTypes, createAdminFormType, createAdminRoleFormType } from "web/types";

interface UseOptions {
    fetchAllAdminRoles?: boolean;
}

export const useAuth = (config?: UseOptions) => {

    const Login = useMutation(async (data: { username: string; password: string }) => {
        try {
            const req: any = await http.post('auth/login/', {
                field: data.username,
                password: data.password
            });
            const res = req.data;
            console.log(res)
            return res;
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
                const response: Partial<LoginAdminApiType> = val.data;
                const token: AuthData = {
                    access_token: response.access_token ?? ''
                };
                const user: UserDataType = {
                    id: response.id ?? 0,
                    first_name: response.first_name ?? '',
                    last_name: response.last_name ?? '',
                    email: response.email ?? '',
                    other_name: response.other_name ?? '',
                    phone_number: response.phone_number ?? '',
                    username: response.username ?? '',
                    gender: response.gender ?? '',
                    address: response.address ?? '',
                    avatar: response.avatar ?? '',
                    role: {
                        id: response.role?.id ?? 0,
                        name: response.role?.name ?? '',
                        description: response.role?.description ?? '',
                        functions: response.role?.functions ?? '',
                        status: response.role?.status ?? 0,
                    },
                }
                const authData = {
                    token,
                    user,
                }
                OpenNotification({
                    description: `Welcome back ${variables.username}`,
                    type: 'success'
                })
                Cookies.set("Auth", JSON.stringify(authData));
                authStore.setAuth(token)
                authStore.setUser(user)
            } else {
                console.log(val.message)
                OpenNotification({
                    description: val.message,
                    type: 'error'
                })
            } 
        },
    })

    const CreateAuth = useMutation(async (data: createAdminFormType) => {
        try {
            const req: any = await http.post('auth/register', data);
            const res = req.data;
            return res;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    })

    const CreateAuthRoles = useMutation(async (data: createAdminRoleFormType) => {
        try {
            const req: any = await http.post('roles/create', data);
            const res = req.data;
            return res;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    })

    const fetchAllAdminRoles = useQuery(['fetchAllAdminRoles'], async () => {
        try {
            const req: any = await http.get('roles/get_all_roles');
            const res = req.data;
            return res;
        } catch (e: any) {
            console.log(e);
            const error = e?.response.data;
            ErrorHelper(error?.errors);
            throw e;
        }
    }, {
        enabled: Boolean(config?.fetchAllAdminRoles),
    })

    return {
        Login,
        CreateAuth,
        CreateAuthRoles,
        fetchAllAdminRoles,
    }
}