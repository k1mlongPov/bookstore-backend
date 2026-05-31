import {Request,Response,NextFunction} from "express";
import {ZodError} from "zod";

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof ZodError) {
        return res.status(400).json({
            status: "error",
            errors: error.flatten((issue) => issue.message),
        });
    }
    res.status(400).json({
        status: "error",
        message: error.message
    })
}