import {z} from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(1,'Required name for category'),
    description: z.string().optional(),
    parentId: z.uuid().optional(),
});
export const updateCategorySchema = z.object({
    name: z.string().min(1,'Required name for category').optional(),
    description: z.string().optional(),
    parentId: z.uuid().optional(),
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;