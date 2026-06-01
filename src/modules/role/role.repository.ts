import prisma from "../../config/prisma";
import {CreateRoleInput, RoleIdInput, UpdateRoleInput} from "./role.validation";

export const RoleRepository = {
    async createRole(data: CreateRoleInput) {
      return prisma.role.create({
          data,
          select: {
              id: true,
              name: true,
              description: true,
              createdAt: true,
          }
      })
    },
    async findAll() {
        return prisma.role.findMany({
            where: {
                deletedAt: null,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    },
    async findByName(name:string) {
        return prisma.role.findFirst({ where: { name ,deletedAt: null} });
    },

    async findById(id: string) {
        return prisma.role.findFirst({
            where: {id, deletedAt: null},
        })
    },

    async updateRole(id: string,data: UpdateRoleInput) {
        return prisma.role.update({
            where: {id},
            data,
        })
    },

    async softDeleteRole(id: string) {
        return prisma.role.update({
            where: {id},
            data: {
                deletedAt:new Date(),
            }
        })
    }
}