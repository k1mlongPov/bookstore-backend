import prisma from "../../config/prisma";

export const AuthRepository = {
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {email},
            include: {
                userRole: {
                    include: {
                        role: {
                            include: {
                                rolePermissions: {
                                    include: {
                                        permission: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    },
}