import {AssignRolePermissionInput} from "./role-permission.schema";
import {RoleRepository} from "../role/role.repository";
import {AppError} from "../../utils/app.error";
import {PermissionRepository} from "../permission/permission.repository";
import {RolePermissionRepository} from "./role-permission.repository";

export const RolePermissionService = {
    async assignRolePermission(data: AssignRolePermissionInput) {
        const existingRole = await RoleRepository.findById(data.roleId);
        if(!existingRole) {
            throw new AppError('Role does not exists!', 409);
        }
        const existingPermission = await PermissionRepository.findById({id: data.permissionId});
        if(!existingPermission) {
            throw new AppError('Permission does not exists!', 409);
        }

        const existing = await RolePermissionRepository.findRolePermissionById(data);
        if(existing) {
            throw new AppError('Role permission already assigned!', 409);
        }
        return RolePermissionRepository.assignRolePermission(data);
    }
}