import {Request,Response,NextFunction} from "express";
import {createCategorySchema, updateCategorySchema} from "./category.schema";
import {CategoryService} from "./category.service";
import {idParamSchema} from "../../shared/validations/common.schema";
import {asyncHandler} from "../../utils/asyncHandler";

export const createCategoryCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = createCategorySchema.parse(req.body);
        const category = await CategoryService.createCategory(body);

        res.status(201).json({
            success: true,
            message: 'Category created successfully.',
            data: category
        })
    }catch (e) {
        next(e);
    }
}


export const getCategoriesCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const categories = await CategoryService.findAllCategories();
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully.",
            data: categories
        })
    }catch (e) {
        next(e);
    }
}

export const getCategoryByIdCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const params = idParamSchema.parse(req.params);
        const category = await CategoryService.findCategoryById(params);

        res.status(200).json({
            success: true,
            message: "Category retrieved successfully.",
            data: category
        });
    }catch (e) {
        next(e);
    }
}

export const updateCategoryCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
    const body = updateCategorySchema.parse(req.body);
    const category = await CategoryService.updateCategory(params, body);

    res.status(200).json({
        success: true,
        message: "Category updated successfully.",
        data: category
    })
})

export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
     await CategoryService.deleteCategory(params);
    res.status(204).send({});
})

export const restoreCategoryCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
    const category = await CategoryService.restoreCategory(params);
    res.status(200).json({
        success: true,
        message: "Category restored successfully.",
        data: category
    })
})