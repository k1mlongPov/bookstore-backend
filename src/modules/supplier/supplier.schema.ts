import {z} from 'zod';

export const createSupplierSchema = z.object({
    name: z.string().trim().min(1, "Supplier name is required"),
    contactPerson: z.string().trim().min(1).optional(),
    email: z.email().optional(),
    phone: z.string().trim().optional(),
    address: z.string().trim().min(1).optional(),
});

export const updateSupplierSchema = createSupplierSchema.partial();

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierInput = z.infer<typeof updateSupplierSchema>;