import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../utils/app.error";
import { AuthUser } from "../modules/auth/auth.types";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader =
            req.headers.authorization;

        if (!authHeader) {
            throw new AppError(
                "Unauthorized",
                401
            );
        }

        const token =
            authHeader.split(" ")[1];

        const payload = jwt.verify(
            token,
            env.JWT_SECRET
        ) as AuthUser;

        (req as Request & {
            user?: AuthUser;
        }).user = payload;

        next();
    } catch {
        next(
            new AppError(
                "Invalid token",
                401
            )
        );
    }
};