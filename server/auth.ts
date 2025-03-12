import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";
import api2 from "@/utils/api2";

interface LoginResponse {
    status: typeof ApiResponseType[keyof typeof ApiResponseType];
    data?: any;
    error?: string;
}

export const login = async (state: unknown, formData: Record<string, any>): Promise<LoginResponse> => {
    try {
        const response = await api2.post("/login", formData);

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
