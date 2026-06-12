import {CreateSupplierInput, UpdateSupplierInput} from "./supplier.schema";
import {SupplierRepository} from "./supplier.repository";
import {AppError} from "../../utils/app.error";
import {idParamInput, paginationInput} from "../../shared/validations/common.schema";

export const SupplierService = {
    async createSupplier(data: CreateSupplierInput) {
        const existingName = await SupplierRepository.findSupplierByName(data.name);
        if(existingName) {
            throw new AppError('Supplier name already exists.', 409);
        }

        if(data.email) {
            const existingEmail = await SupplierRepository.findSupplierByEmail(data.email);
            if(existingEmail) {
                throw new AppError('Email already exists.', 409);
            }
        }

        return SupplierRepository.createSupplier(data);
    },
    async findAllSuppliers(query: paginationInput) {
        const skip = (query.page -1) * query.limit;
        const [suppliers, total] = await Promise.all([
            SupplierRepository.findAllSuppliers(skip, query.limit),
            SupplierRepository.countSuppliers(),
        ])

        return {
            data: suppliers,
            pagination: {
                page: query.page,
                limit: query.limit,
                total,
                totalPages: Math.ceil(total / query.limit),
            }
        }
    },

    async findSupplierById(id: idParamInput) {
        const supplier = await SupplierRepository.findSupplierById(id);
        if(!supplier) {
            throw new AppError('Supplier not found', 404);
        }
        return supplier;
    },

    async updateSupplier(id: idParamInput,data: UpdateSupplierInput) {
        if (Object.keys(data).length === 0) {
            throw new AppError('No fields provided for update.', 400);
        }
        const supplier = await this.findSupplierById(id);

        if(data.name) {
            const existingName = await SupplierRepository.findSupplierByName(data.name);
            if(existingName && existingName.id !== supplier.id) {
                throw new AppError('Supplier name already exists.', 409);
            }
        }

        if(data.email) {
            const existingEmail = await SupplierRepository.findSupplierByEmail(data.email);
            if(existingEmail && existingEmail.id !== supplier.id) {
                throw new AppError('Email already exists.', 409);
            }
        }

        return SupplierRepository.updateSupplier(id, data);
    },

    async deleteSupplier(id: idParamInput) {
        const supplier = await SupplierRepository.findSupplierIncludingDeleted(id);
        if(!supplier) {
            throw new AppError('Supplier not found', 404);
        }
        if(supplier.deletedAt !== null) {
            throw new AppError('Supplier already deleted', 409);
        }

        return SupplierRepository.softDeleteSupplier(id);
    },

    async restoreSupplier(id: idParamInput) {
        const supplier = await SupplierRepository.findSupplierIncludingDeleted(id);
        if(!supplier) {
            throw new AppError('Supplier not found', 404);
        }
        if(supplier.deletedAt === null) {
            throw new AppError('Supplier has not been deleted', 409);
        }

        return SupplierRepository.restoreSupplier(id);

    },
}