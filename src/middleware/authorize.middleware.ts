import { NextFunction, Response ,Request} from "express";
import { AppError } from "../utils/app.error";

export const authorize =
    (...allowedRoles: string[]) =>
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

            const hasRole = req.user.roles.some(
                role =>
                    allowedRoles.includes(role)
            );

            if (!hasRole) {
                throw new AppError(
                    "Forbidden",
                    403
                );
            }
            return next();
        };