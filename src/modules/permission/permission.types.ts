export interface CreatePermissionInput {
    resource: string;
    action: PermissionAction;
}

export interface CreatePermissionData {
    name: string;
    resource: string;
    action: PermissionAction;
}

export interface UpdatePermissionData {
    name?: string;
    resource?: string;
    action?: PermissionAction;
}

export interface UpdatePermissionInput {
    resource?: string;
    action?: PermissionAction;
}

export type PermissionAction =
    | "assign"
    | "create"
    | "read"
    | "update"
    | "delete"
    | "remove";