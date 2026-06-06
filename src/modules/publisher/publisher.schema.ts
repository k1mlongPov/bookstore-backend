import {z} from 'zod';

export const publisherSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().optional(),
    email: z.email().optional(),
    address: z.string().optional(),
    website: z.url().optional(),
});

export const updatePublisherSchema = publisherSchema.partial();

export type PublisherInput = z.infer<typeof publisherSchema>;
export type UpdatePublisherInput = z.infer<typeof updatePublisherSchema>;