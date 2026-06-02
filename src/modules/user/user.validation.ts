import { z } from "zod";

export const createUserSchema = z.object({
    username: z.string().min(3),
    email: z.email(),
    passwordHash: z.string().min(8),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string().optional(),
});

export const userIdSchema = z.object({
    id: z.uuid(),
});

export const getUsersQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
});

export const updateUserSchema = z.object({
    username: z.string().min(3).optional(),
    email: z.email().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UserIdInput = z.infer<typeof userIdSchema>;
export type GetUsersQueryInput = z.infer<typeof getUsersQuerySchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;