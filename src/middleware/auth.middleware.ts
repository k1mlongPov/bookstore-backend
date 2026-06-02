import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {env} from "../config/env";
import {AppError} from "../utils/app.error";
import {AuthUser} from "../modules/auth/auth.types";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader =
            req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {
            throw new AppError(
                "Unauthorized",
                401
            );
        }

        const token =
            authHeader.split(" ")[1];

        req.user = jwt.verify(
            token,
            env.JWT_SECRET
        ) as AuthUser;

        return next();
    } catch (error) {
        if (
            error instanceof
            jwt.TokenExpiredError
        ) {
            return next(
                new AppError(
                    "Token expired",
                    401
                )
            );
        }

        return next(
            new AppError(
                "Invalid token",
                401
            )
        );
    }
};