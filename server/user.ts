import api from "@/utils/api";
import api2 from "@/utils/api2";
import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";

interface UserResponse {
    status: typeof ApiResponseType[keyof typeof ApiResponseType];
    data?: any;
    error?: string;
}

export const getUsers = async (formData: any) => {
    const response = await api.get(
        `/users?pageSize=${formData.limit}&search=${formData.search}&sortColumn=${formData.sort_attr}&sortOrder=${formData.sort.toUpperCase()}`,
    )
    return response.data;
};

export const getUserById = async (id: any) => {
    const response = await api.get(
        `/users/${id}`,
    )
    return response.data;
};

export const addUser = async (state: unknown, formData: Record<string, any>): Promise<UserResponse> => {
    try {
        const response = await api2.post("/users", formData);

        console.log('response', response);
        return {
            status: ApiResponseType.SUCCESS,
            data: response.data,
        };
    } catch (err: any) {
        console.log('err', err);

        return {
            status: ApiResponseType.ERROR,
            error: err.response?.data?.message,
        };
    }
};

export const editUser = async (state: unknown, formData: Record<string, any>): Promise<UserResponse> => {
    try {
        const response = await api2.put(`/users/${formData.id}`, formData);

        console.log(response);
        return {
            status: ApiResponseType.SUCCESS,
            data: response.data,
        };
    } catch (err: any) {
        console.log(err);

        return {
            status: ApiResponseType.ERROR,
            error: err.response?.data?.message,
        };
    }
};

export const deleteUser = async (id: any): Promise<UserResponse> => {
    try {
        const response = await api.delete(`/users/${id}`);

        console.log(response);
        return {
            status: ApiResponseType.SUCCESS,
            data: response.data,
        };
    } catch (err: any) {
        console.log(err);

        return {
            status: ApiResponseType.ERROR,
            error: err.response?.data?.message,
        };
    }
};

export const userChangeStatus = async (formData: any): Promise<UserResponse> => {
    try {
        const response = await api2.post(`/user-change-status/${formData.id}`, formData.data);

        console.log(response);
        return {
            status: ApiResponseType.SUCCESS,
            data: response.data,
        };
    } catch (err: any) {
        console.log(err);

        return {
            status: ApiResponseType.ERROR,
            error: err.response?.data?.message,
        };
    }
};

export const imageUpload = async (formData: any): Promise<UserResponse> => {
    try {
        const response = await api2.post(`/image-upload`, formData);

        console.log(response);
        return {
            status: ApiResponseType.SUCCESS,
            data: response.data,
        };
    } catch (err: any) {
        console.log(err);

        return {
            status: ApiResponseType.ERROR,
            error: err.response?.data?.message,
        };
    }
};