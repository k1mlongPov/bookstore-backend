import {z} from "zod"

export const createRoleSchema = z.object({
    name: z.string().min(3, 'Role name must be at least 3 characters.').transform((value) => value.toUpperCase()),
    description: z.string().min(1).optional()
})

export const updateRoleSchema = z.object({
    name: z.string().min(3,'Role name must be at least 3 characters.').transform((value) => value.toUpperCase()).optional(),
    description: z.string().min(1).optional(),
})

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;