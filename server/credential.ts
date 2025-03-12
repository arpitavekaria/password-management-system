import api from "@/utils/api";
import api2 from "@/utils/api2";
import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";

interface CredentialResponse {
    status: typeof ApiResponseType[keyof typeof ApiResponseType];
    data?: any;
    error?: string;
}

export const getCredentials = async (formData: any) => {
    const response = await api.get(
        `/credentials?pageSize=${formData.limit}&search=${formData.search}&sortColumn=${formData.sort_attr}&sortOrder=${formData.sort.toUpperCase()}`,
    )
    return response.data;
};

export const getCredentialById = async (id: any) => {
    const response = await api.get(
        `/credentials/${id}`,
    )
    return response.data;
};

export const addCredential = async (state: unknown, formData: Record<string, any>): Promise<CredentialResponse> => {
    try {
        const response = await api2.post("/credentials", formData);

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

export const editCredential = async (state: unknown, formData: Record<string, any>): Promise<CredentialResponse> => {
    try {
        const response = await api2.put(`/credentials/${formData.id}`, formData);

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

export const deleteCredential = async (id: any): Promise<CredentialResponse> => {
    try {
        const response = await api.delete(`/credentials/${id}`);

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
