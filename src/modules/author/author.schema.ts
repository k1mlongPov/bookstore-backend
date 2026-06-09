import {z} from 'zod';

export const createAuthorSchema = z.object({
    firstName: z.string().min(1,'First name is required'),
    lastName: z.string().min(1,'Last name is required'),
    biography: z.string().optional(),
})
export const updateAuthorSchema = z.object({
    firstName: z.string().min(1,'First name is required').optional(),
    lastName: z.string().min(1,'Last name is required').optional(),
    biography: z.string().optional(),
})

export type CreateAuthorInput = z.infer<typeof createAuthorSchema>;
export type UpdateAuthorInput = z.infer<typeof updateAuthorSchema>;