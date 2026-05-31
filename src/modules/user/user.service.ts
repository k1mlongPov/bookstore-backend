import {CreateUserInput, GetUsersQueryInput, UpdateUserInput, UserIdInput, userIdSchema} from "./user.validation";
import bcrypt from "bcrypt";
import {UserRepository} from "./user.repository";
import {AppError} from "../../utils/app.error";
import prisma from "../../config/prisma";
import {PaginationResult} from "../../types/pagination.types";
import {UserResponse} from "./user.types";

export const UserService = {
    async getAllUsers(page:number, limit: number) :Promise<PaginationResult<UserResponse>> {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            UserRepository.getAllUsers(skip, limit),
            UserRepository.count(),
        ]);
        return {
            data: users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            }
        }
    },
    async getUserById(data: UserIdInput) {
        const user = await UserRepository.getUserById(data.id);
        if (!user) {
            throw new AppError('User not found!', 404)
        }
        return user;
    },
    async createUser  (data: CreateUserInput) {
        const existingEmail = await UserRepository.findByEmail(data.email);
        if(existingEmail){
            throw new AppError('Email already exists', 409)
        }

        const existingUsername = await UserRepository.findByUsername(data.username);
        if(existingUsername){
            throw new AppError('Username already exists', 409)
        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        return UserRepository.create({
            username: data.username,
            email: data.email,
            passwordHash,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
        })
    },
    async updateUser  (id: string, data: UpdateUserInput) {
        const user = await UserRepository.getUserById(id);

        if (!user) {
            throw new AppError('User not found!', 404)
        }
        if (data.email) {
            const existingEmail =
                await UserRepository.findByEmail(data.email);

            if (
                existingEmail &&
                existingEmail.id !== id
            ) {
                throw new AppError(
                    "Email already exists",
                    409
                );
            }
        }
        if (data.username) {
            const existingUsername =
                await UserRepository.findByUsername(data.username);

            if (
                existingUsername &&
                existingUsername.id !== id
            ) {
                throw new AppError(
                    "Username already exists",
                    409
                );
            }
        }
        return UserRepository.updateUserById(
            id,
            data,
        );
    },
    async deleteUser(id: string) {
        const user =
            await UserRepository.getUserById(id);

        if (!user) {
            throw new AppError(
                "User not found",
                404
            );
        }

        return UserRepository.softDeleteUser(id);
    }
}