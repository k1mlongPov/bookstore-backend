import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app.error";

export const authorize =
    (...permissions: string[]) =>
        (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            if (!req.user) {
                throw new AppError(
                    "Unauthorized",
                    401
                );
            }
            console.log(req.user);

            const hasPermission =
                permissions.some(permission =>
                    req.user.permissions.includes(
                        permission
                    )
                );

            if (!hasPermission) {
                throw new AppError(
                    "Forbidden",
                    403
                );
            }
            return next();
        };