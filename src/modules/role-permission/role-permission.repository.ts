import {AssignRolePermissionInput} from "./role-permission.schema";
import prisma from "../../config/prisma";

export const RolePermissionRepository = {
    async assignRolePermission(data: AssignRolePermissionInput) {
        return prisma.rolePermission.create({data});
    },

    async findAllRolePermissions() {
      return prisma.rolePermission.findMany();
    },

    async findRolePermissionById(data: AssignRolePermissionInput) {
        return prisma.rolePermission.findUnique({
            where:{
                roleId_permissionId: {
                    roleId: data.roleId,
                    permissionId: data.permissionId,
                }
            }
        })
    }
}