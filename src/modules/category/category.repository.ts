import {CreateCategoryInput, UpdateCategoryInput} from "./category.schema";
import prisma from "../../config/prisma";
import {idParamInput} from "../../shared/validations/common.schema";

export const CategoryRepository= {
    async createCategory(data: CreateCategoryInput) {
        return prisma.category.create({data});
    },

    async findCategoryByName(name: string) {
        return prisma.category.findUnique({where: {name}})
    },

    async findAllCategories() {
        return prisma.category.findMany({
            where: {deletedAt:null},
            include: {
                parent:true,
                children: true,
            }
        })
    },

    async findCategoryById(categoryId: idParamInput) {
        return prisma.category.findFirst({
            where: {
                id: categoryId.id,
                deletedAt: null
            },
            include: {
                parent:true,
                children: true
            }
        });
    },

    async findCategoryByIdIncludingDeleted(categoryId: idParamInput) {
        return prisma.category.findUnique({
            where: {
                id: categoryId.id
            }
        });
    },

    async updateCategory(categoryId:idParamInput,data: UpdateCategoryInput) {
        return prisma.category.update({
            where: {
                id: categoryId.id,
            },
            data,
            include: {
                parent:true,
                children: true
            }
        })
    },

    async softDeleteCategory(categoryId:idParamInput) {
        return prisma.category.update({
            where: {
                id: categoryId.id,
            },
            data: {
                deletedAt: new Date(),
            }
        })
    },

    async restoreCategory(categoryId:idParamInput) {
        return prisma.category.update({
            where: categoryId,
            data: {
                deletedAt: null
            }
        })
    }
}