import api from "@/utils/api";
import api2 from "@/utils/api2";
import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";

interface ProjectResponse {
    status: typeof ApiResponseType[keyof typeof ApiResponseType];
    data?: any;
    error?: string;
}

export const getProjects = async (formData: any) => {
    const response = await api.get(
        `/projects?pageSize=${formData.limit}&search=${formData.search}&sortColumn=${formData.sort_attr}&sortOrder=${formData.sort.toUpperCase()}`,
    )
    return response.data;
};

export const getProjectById = async (id: any) => {
    const response = await api.get(
        `/projects/${id}`,
    )
    return response.data;
};

export const getAllProjects = async () => {
    const response = await api.get(
        `/get-all-projects`,
    )
    return response.data;
};

export const addProject = async (state: unknown, formData: Record<string, any>): Promise<ProjectResponse> => {
    try {
        const response = await api2.post("/projects", formData);

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

export const editProject = async (state: unknown, formData: Record<string, any>): Promise<ProjectResponse> => {
    try {
        const response = await api2.put(`/projects/${formData.id}`, formData);

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

export const deleteProject = async (id: any): Promise<ProjectResponse> => {
    try {
        const response = await api.delete(`/projects/${id}`);

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

export const imageUpload = async (formData: any): Promise<ProjectResponse> => {
    try {
        const response = await api2.post(`/imageUpload`,formData);

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