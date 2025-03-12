export const ApiResponseType = {
    SUCCESS: "success",
    ERROR: "error",
} as const;

type ApiResponseTypeKeys = keyof typeof ApiResponseType;
