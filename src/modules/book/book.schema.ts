import {z} from "zod";

export const createBookSchema = z.object({
    isbn: z.string().min(10).max(17),
    barcode: z.string().optional(),
    englishTitle: z.string().min(1, "English title is required"),
    khmerTitle: z.string().optional(),
    description: z.string().optional(),
    sellingPrice: z.coerce.number()
        .positive("Price must be greater than 0")
        .multipleOf(0.01, "Price cannot have more than 2 decimal places"),
    costPrice: z.coerce.number()
        .positive("Price must be greater than 0")
        .multipleOf(0.01, "Price cannot have more than 2 decimal places"),
    coverImageUrl: z.url().optional(),
    bookImagesUrl: z.array(z.url()).optional(),
    publicationYear: z.number()
        .int()
        .min(1000)
        .max(new Date().getFullYear())
        .optional(),
    language: z.string().optional(),
    authorIds: z.array(z.uuid()).optional(),
    categoryId: z.uuid().optional(),
    publisherId: z.uuid().optional(),
    supplierId: z.uuid().optional(),
});

export const updateBookSchema = createBookSchema.partial();

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;