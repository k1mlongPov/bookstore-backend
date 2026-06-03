import { z } from "zod";

export const idParamSchema = z.object({
    id: z.uuid(),
});

export const paginationSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
});

export const paginationWithSearchSchema = paginationSchema.extend({
    search: z.string().optional(),
});

export const paginationWithSortSchema = paginationSchema.extend({
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export type idParamInput = z.infer<typeof idParamSchema>;
export type paginationInput = z.infer<typeof paginationSchema>;