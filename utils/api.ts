import axios, {InternalAxiosRequestConfig} from "axios";
import {getAuthSession} from "@/lib/session/authSession";
import {API_BASE_URL} from "@/utils/constants";
import {AcceptHeader} from "@/lib/utiills/enums/AcceptLanguage";

// Create an instance of axios
const customAxios = axios.create();

customAxios.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const session = await getAuthSession();
        const accessToken = session?.accessToken || "Temp";

        if (accessToken && config.headers) {
            config.baseURL = API_BASE_URL;
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            config.headers["Content-Type"] = "application/json";
            config.headers["accept-language"] = AcceptHeader.EN;
            config.headers["Cache-Control"] = "no-cache";
            config.headers["Pragma"] = "no-cache";
            config.headers["Expires"] = "0";
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default customAxios
