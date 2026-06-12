import {CreateSupplierInput, UpdateSupplierInput} from "./supplier.schema";
import prisma from "../../config/prisma";
import {idParamInput} from "../../shared/validations/common.schema";

export const SupplierRepository = {
    async createSupplier(data: CreateSupplierInput) {
        return prisma.supplier.create({data})
    },

    async findAllSuppliers(skip: number, take: number) {
        return prisma.supplier.findMany({
            where: {deletedAt: null},
            skip,
            take,
            include: {
                books: true
            }
        })
    },

    async countSuppliers() {
      return prisma.supplier.count({
          where: {deletedAt: null},
      });
    },

    async findSupplierById(supplierId: idParamInput) {
        return prisma.supplier.findFirst({
            where:{
                id: supplierId.id,
                deletedAt: null
            },
            include: {
                books: true
            }
        })
    },

    async findSupplierByName(name: string) {
        return prisma.supplier.findUnique({
            where: { name }
        });
    },

    async findSupplierByEmail(email: string) {
        return prisma.supplier.findUnique({
            where: { email }
        });
    },

    async findSupplierIncludingDeleted(supplierId: idParamInput) {
        return prisma.supplier.findUnique({
            where: supplierId,
        })
    },



    async updateSupplier(supplierId: idParamInput,data: UpdateSupplierInput) {
        return prisma.supplier.update({
            where: {
                id: supplierId.id,
            },
            data
        })
    },

    async softDeleteSupplier(supplierId: idParamInput) {
        return prisma.supplier.update({
            where: { id: supplierId.id },
            data: {
                deletedAt: new Date(),
            },
        });
    },

    async restoreSupplier(supplierId: idParamInput) {
        return prisma.supplier.update({
            where: {id: supplierId.id},
            data: {deletedAt: null}
        })
    },
}