import api from "@/utils/api";
import api2 from "@/utils/api2";
import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";

interface TechnologyResponse {
    status: typeof ApiResponseType[keyof typeof ApiResponseType];
    data?: any;
    error?: string;
}

export const getTechnologies = async (formData: any) => {
    const response = await api.get(
        `/technologies?pageSize=${formData.limit}&search=${formData.search}&sortColumn=${formData.sort_attr}&sortOrder=${formData.sort.toUpperCase()}`,
    )
    return response.data;
};

export const getTechnologyById = async (id: any) => {
    const response = await api.get(
        `/technologies/${id}`,
    )
    return response.data;
};

export const getAllTechnologies = async () => {
    const response = await api.get(
        `/get-all-technologies`,
    )
    return response.data;
};

export const addTechnology = async (state: unknown, formData: Record<string, any>): Promise<TechnologyResponse> => {
    try {
        const response = await api2.post("/technologies", formData);

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

export const editTechnology = async (state: unknown, formData: Record<string, any>): Promise<TechnologyResponse> => {
    try {
        const response = await api2.put(`/technologies/${formData.id}`, formData);

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

export const deleteTechnology = async (id: any): Promise<TechnologyResponse> => {
    try {
        const response = await api.delete(`/technologies/${id}`);

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
