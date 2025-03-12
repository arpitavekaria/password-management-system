import api from "@/utils/api";
import api2 from "@/utils/api2";
import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";

interface CredentialTypeResponse {
    status: typeof ApiResponseType[keyof typeof ApiResponseType];
    data?: any;
    error?: string;
}

export const getCredentialTypes = async (formData: any) => {
    const response = await api.get(
        `/credential-types?pageSize=${formData.limit}&search=${formData.search}&sortColumn=${formData.sort_attr}&sortOrder=${formData.sort.toUpperCase()}`,
    )
    return response.data;
};

export const getCredentialTypeById = async (id: any) => {
    const response = await api.get(
        `/credential-types/${id}`,
    )
    return response.data;
};

export const getAllCredentialTypes = async () => {
    const response = await api.get(
        `/get-all-credential-types`,
    )
    return response.data;
};

export const addCredentialType = async (state: unknown, formData: Record<string, any>): Promise<CredentialTypeResponse> => {
    try {
        const response = await api2.post("/credential-types", formData);

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

export const editCredentialType = async (state: unknown, formData: Record<string, any>): Promise<CredentialTypeResponse> => {
    try {
        const response = await api2.put(`/credential-types/${formData.id}`, formData);

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

export const deleteCredentialType = async (id: any): Promise<CredentialTypeResponse> => {
    try {
        const response = await api.delete(`/credential-types/${id}`);

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
