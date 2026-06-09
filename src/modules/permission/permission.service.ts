import {PermissionRepository} from "./permission.repository";
import {AppError} from "../../utils/app.error";
import {idParamInput} from "../../shared/validations/common.schema";
import {CreatePermissionInput, UpdatePermissionInput} from "./permission.types";

export const PermissionService = {
    async createPermission(data: CreatePermissionInput) {
        const name = `${data.resource}:${data.action}`;

        const existingPermission = await PermissionRepository.findByName(name);

        if (existingPermission) {
            throw new AppError('Permission already exists', 409);
        }

        return PermissionRepository.createPermission({
            ...data,
            name
        })
    },

    async findPermissionById(id: idParamInput) {
        const permission = await PermissionRepository.findById(id);

        if (!permission) {
            throw new AppError('Permission not found', 409);
        }

        return permission;
    },

    async findAllPermissions() {
        const permissions = await PermissionRepository.findAll();
        if(permissions.length == 0) {
            throw new AppError('No permission found!', 404);
        }
        return permissions;
    },

    async updatePermission(id: idParamInput, data: UpdatePermissionInput) {
        const permission = await PermissionRepository.findById(id);

        if (!permission) {
            throw new AppError(
                "Permission not found",
                404
            );
        }

        const resource = data.resource ?? permission.resource;

        const action = data.action ?? permission.action;

        const name = `${resource}:${action}`;

        const existingPermission =
            await PermissionRepository.findByName(name);

        if (
            existingPermission &&
            existingPermission.id !== id.id
        ) {
            throw new AppError(
                "Permission already exists",
                409
            );
        }

        return PermissionRepository.updatePermission(
            id,
            {...data, name}
        );
    }
}