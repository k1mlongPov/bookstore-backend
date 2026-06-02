import prisma from "../../config/prisma";
import {CreateUserInput} from "../user/user.validation";
import {CreateUserRepositoryInput} from "../user/user.types";

export const AuthRepository = {
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {email},
            include: {
                userRole: {
                    include: {
                        role: true
                    }
                }
            }

        });
    },
    async register(
        data: CreateUserRepositoryInput,
        customerRoleId: string
    ) {
        return prisma.user.create({
            data: {
                ...data,
                userRole: {
                    create: {
                        roleId: customerRoleId,
                    },
                },
            },
        });
    }
}