import { Response } from 'express';

export type ApiResponse<T> = {
    success: boolean;
    message: string | null; // null if no error
    data: T | null;         // null if no data
};

export const sendResponse = <T>(
    res: Response,
    data: T | null,
    success = true,
    message: string | null = null,
    statusCode = 200
) => {
    const response: ApiResponse<T> = { success, message, data };
    return res.status(statusCode).json(response);
};