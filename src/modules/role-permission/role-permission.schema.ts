import {z} from 'zod'

export const assignRolePermissionSchema = z.object({
    roleId: z.uuid(),
    permissionId: z.uuid()
})

export type AssignRolePermissionInput = z.infer<typeof assignRolePermissionSchema>;