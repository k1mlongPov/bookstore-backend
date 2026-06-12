import {asyncHandler} from "../../utils/asyncHandler";
import {createSupplierSchema, updateSupplierSchema} from "./supplier.schema";
import {SupplierService} from "./supplier.service";
import {idParamSchema, paginationSchema} from "../../shared/validations/common.schema";

export const createSupplierCtrl = asyncHandler(async (req, res) => {
    const body = createSupplierSchema.parse(req.body);
    const result = await SupplierService.createSupplier(body);

    res.status(201).json({
        success: true,
        message: 'Supplier created successfully.',
        data: result
    })
})

export const getAllSuppliersCtrl = asyncHandler(async (req, res) => {
    const query = paginationSchema.parse(req.query);
    const result = await SupplierService.findAllSuppliers(query);

    res.status(200).json({
        success: true,
        message: 'Suppliers retrieved successfully.',
        data: result.data,
        pagination: result.pagination,
    })
})

export const getSupplierByIdCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
    const result = await SupplierService.findSupplierById(params);

    res.status(200).json({
        success: true,
        message: 'Supplier retrieved successfully.',
        data: result,
    })
})

export const updateSupplierCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
    const body = updateSupplierSchema.parse(req.body);
    const result = await SupplierService.updateSupplier(params, body);

    res.status(200).json({
        success: true,
        message: 'Supplier updated successfully.',
        data: result
    })
})

export const softDeleteSupplierCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
    await SupplierService.deleteSupplier(params);
    res.status(204).send();
})

export const restoreSupplierCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
    const result = await SupplierService.restoreSupplier(params);
    res.status(200).json({
        success: true,
        message: 'Supplier restored successfully.',
        data: result
    })
})