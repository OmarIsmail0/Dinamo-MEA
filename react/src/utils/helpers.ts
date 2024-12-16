/* eslint-disable @typescript-eslint/no-explicit-any */

export const formatError = (error: any): string => {
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
    }
    return error.message || "An unexpected error occurred.";
};

export const truncateText = (text: string, length: number): string => {
    return text.length > length ? text.slice(0, length) + "..." : text;
};
