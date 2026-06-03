import prisma from "../../config/prisma";
import {AssignRolePermissionInput} from "../role-permission/role-permission.schema";
import {AssignRoleInput} from "./user-role.schema";

export const UserRoleRepository = {
    async assignRole(data: AssignRoleInput) {
        return prisma.userRole.create({data})
    },
    async findUserRole(data: AssignRoleInput) {
        return prisma.userRole.findUnique({
            where: {
                userId_roleId: {
                    userId: data.userId,
                    roleId: data.roleId,
                }
            }
        })
    },
    async findAllUserRole(){
        return prisma.userRole.findMany();
    }
}