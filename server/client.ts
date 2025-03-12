import api from "@/utils/api";
import api2 from "@/utils/api2";
import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";

interface ClientResponse {
    status: typeof ApiResponseType[keyof typeof ApiResponseType];
    data?: any;
    error?: string;
}

export const getClients = async (formData: any) => {
    const response = await api.get(
        `/clients?pageSize=${formData.limit}&search=${formData.search}&sortColumn=${formData.sort_attr}&sortOrder=${formData.sort.toUpperCase()}`,
    )
    return response.data;
};

export const getClientById = async (id: any) => {
    const response = await api.get(
        `/clients/${id}`,
    )
    return response.data;
};

export const getAllClients = async () => {
    const response = await api.get(
        `/get-all-clients`,
    )
    return response.data;
};

export const addClient = async (state: unknown, formData: Record<string, any>): Promise<ClientResponse> => {
    try {
        const response = await api2.post("/clients", formData);

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

export const editClient = async (state: unknown, formData: Record<string, any>): Promise<ClientResponse> => {
    try {
        const response = await api2.put(`/clients/${formData.id}`, formData);

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

export const deleteClient = async (id: any): Promise<ClientResponse> => {
    try {
        const response = await api.delete(`/clients/${id}`);

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
