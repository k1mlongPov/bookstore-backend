import {NextFunction, Response} from "express";
import {AppError} from "../utils/app.error";
import {AuthRequest} from "../modules/auth/auth.types";
export const authorize = (...allowedRoles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
    const hasRole = req.user?.roles.some(
        (role: any) => allowedRoles.includes(role)

    );

    if (!hasRole) {
        throw new AppError(
            "Forbidden",
            403
        );
    }
    next();
};
