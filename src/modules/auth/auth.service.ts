import {LoginInput} from "./auth.validation";
import {AuthRepository} from "./auth.repository";
import {AppError} from "../../utils/app.error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {env} from "../../config/env";
import {AuthUser} from "./auth.types";

export const AuthService = {
    async login(data: LoginInput) {
        const user = await AuthRepository.findByEmail(data.email);
        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }
        const isMatch = await bcrypt.compare(data.password, user.passwordHash);
        if(!isMatch) {
            throw new AppError('Invalid email or password', 401);
        }
        const roles = user.userRole.map((userRole) => userRole.role.name);
        const payload: AuthUser = {
            userId: user.id,
            roles: roles,
        }
        const token = jwt.sign(
            payload,
            env.JWT_SECRET!,
            {
                expiresIn: "1d"
            }
        );
        return {
            accessToken: token,
        }
    }
}