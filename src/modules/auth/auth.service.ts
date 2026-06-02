import {LoginInput} from "./auth.validation";
import {AuthRepository} from "./auth.repository";
import {AppError} from "../../utils/app.error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {env} from "../../config/env";
import {AuthUser} from "./auth.types";
import {CreateUserInput} from "../user/user.validation";
import {RoleRepository} from "../role/role.repository";
import {UserRepository} from "../user/user.repository";
import {UserRoleService} from "../user-role/user-role.service";

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
    },

    async register(data: CreateUserInput) {
        const existingEmail =
            await AuthRepository.findByEmail(
                data.email
            );

        if (existingEmail) {
            throw new AppError(
                "Email already exists",
                409
            );
        }

        const existingUsername =
            await UserRepository.findByUsername(
                data.username
            );

        if (existingUsername) {
            throw new AppError(
                "Username already exists",
                409
            );
        }

        const customerRole =
            await RoleRepository.findByName(
                "CUSTOMER"
            );

        if (!customerRole) {
            throw new AppError(
                "CUSTOMER role not found",
                500
            );
        }

        const passwordHash =
            await bcrypt.hash(
                data.passwordHash,
                10
            );

        const user =
            await UserRepository.create({
                username: data.username,
                email: data.email,
                passwordHash,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
            });

        await UserRoleService.assignRole(
            user.id,
            customerRole.id
        );

        return user;
    }
}