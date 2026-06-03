import {CreatePermissionData} from "./permission.types";
import prisma from "../../config/prisma";
import {idParamInput} from "../../shared/validations/common.schema";

export const PermissionRepository = {
    async createPermission(data: CreatePermissionData) {
        return prisma.permission.create({data});
    },

    async findById(id: idParamInput) {
        return prisma.permission.findUnique({where: id});
    },

    async findByName(name: string) {
        return prisma.permission.findUnique({where: {name}});
    },

    async findAll() {
        return prisma.permission.findMany();
    }
}