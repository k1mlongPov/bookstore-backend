import { z } from "zod";

export const createUserSchema = z.object({
    username: z.string().min(3),
    email: z.email(),
    passwordHash: z.string().min(8),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string().optional(),
});

export const updateUserSchema = z.object({
    username: z.string().min(3).optional(),
    email: z.email().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;