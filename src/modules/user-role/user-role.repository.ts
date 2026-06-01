import prisma from "../../config/prisma";

export const UserRoleRepository = {
    async assignRole(userId: string, roleId: string) {
        return prisma.userRole.create({
            data: {
                userId,
                roleId
            }
        })
    },
    async findUserRole(userId: string, roleId: string) {
        return prisma.userRole.findUnique({
            where:{
                userId_roleId: {
                    userId,
                    roleId
                }
            }
        })
    }
}