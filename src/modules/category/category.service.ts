import {CreateCategoryInput, UpdateCategoryInput} from "./category.schema";
import {CategoryRepository} from "./category.repository";
import {AppError} from "../../utils/app.error";
import {idParamInput} from "../../shared/validations/common.schema";
import {PublisherRepository} from "../publisher/publisher.repository";

export const CategoryService = {
    async createCategory(data: CreateCategoryInput) {
        const existingCategory = await CategoryRepository.findCategoryByName(data.name);
        if (existingCategory) {
            throw new AppError('Category already exists!', 409);
        }

        if (data.parentId) {
            const parent = await CategoryRepository.findCategoryById({id: data.parentId});
            if (!parent) {
                throw new AppError(
                    'Parent category not found!',
                    404
                );
            }
        }

        return CategoryRepository.createCategory(data);
    },

    async findAllCategories() {
        const categories = await CategoryRepository.findAllCategories();
        if(categories.length === 0) {
            throw new AppError('No category exists!', 409);
        }

        return categories;
    },

    async findCategoryById(id:idParamInput) {
        const category = await CategoryRepository.findCategoryById(id);
        if(!category) {
            throw new AppError('Category not found!', 404);
        }
        return category;
    },

    async updateCategory(categoryId:idParamInput, data: UpdateCategoryInput) {
        const existingCategory = await CategoryRepository.findCategoryById(categoryId);
        if(!existingCategory) {
            throw new AppError('Category not found!', 404);
        }

        if(data.name) {
            const existingCategoryWithName = await CategoryRepository.findCategoryByName(data.name);
            if(existingCategoryWithName && existingCategoryWithName.id !==categoryId.id ) {
                throw new AppError('Name already exists!', 409);
            }
        }
        if (data.parentId === categoryId.id) {
            throw new AppError(
                "Category cannot be its own parent",
                400
            );
        }

        return CategoryRepository.updateCategory(categoryId, data);
    },

    async deleteCategory(categoryId: idParamInput) {
        const category = await CategoryRepository.findCategoryByIdIncludingDeleted(categoryId);
        if(!category) {
            throw new AppError('Category not found!', 404);
        }
        if(category.deletedAt !== null) {
            throw new AppError('Category already deleted!', 409);
        }

        return CategoryRepository.softDeleteCategory(categoryId);
    },

    async restoreCategory(categoryId: idParamInput) {
        const existingCategory = await CategoryRepository.findCategoryByIdIncludingDeleted(categoryId);
        if(!existingCategory) {
            throw new AppError('Category not found!', 404);
        }

        if(existingCategory.deletedAt === null) {
            throw new AppError('Category is not deleted!', 409);
        }

        return CategoryRepository.restoreCategory(categoryId);
    }
}