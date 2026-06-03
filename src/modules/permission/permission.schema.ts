import { z } from 'zod';

export const createPermissionSchema = z.object({
    resource: z.string().min(1),
    action: z.enum([
        'create',
        'read',
        'update',
        'delete',
        'assign',
        'remove',
    ]),
});