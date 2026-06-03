import {CreateRoleInput, UpdateRoleInput} from "./role.schema";
import {RoleRepository} from "./role.repository";
import {AppError} from "../../utils/app.error";
import {idParamInput} from "../../shared/validations/common.schema";

export const RoleService = {
    async createRole(data: CreateRoleInput) {
        const roleName = data.name.toUpperCase();
        const existingRole = await RoleRepository.findByName(roleName);
        if (existingRole) {
            throw new AppError('Role already exists.', 409);
        }
        return RoleRepository.createRole(
            {
                ...data,
                name: roleName,
            }
        );
    },
    async getAllRoles() {
        return RoleRepository.findAll();
    },

    async getRoleById(data: idParamInput) {
        const role = await RoleRepository.findById(data.id);
        if(!role) {
            throw new AppError('Role not found!', 404);
        }
        return role;
    },

    async updateRole(roleId: idParamInput,data: UpdateRoleInput) {
        const role = await RoleRepository.findById(roleId.id);
        if(!role) {
            throw new AppError('Role not found!', 404);
        }

        const roleName = data.name?.toUpperCase();

        if(roleName) {
            const existingRole = await RoleRepository.findByName(roleName);
            if(existingRole && existingRole.id !== roleId.id) {
                throw new AppError('Role already exists.', 409);
            }
        }
        return RoleRepository.updateRole(roleId.id, {...data, name: roleName});
    },

    async softDeleteRole(roleId: idParamInput) {
        const role = await RoleRepository.findById(roleId.id);
        if(!role) {
            throw new AppError('Role not found!', 404);
        }
        if (role.name === 'ADMIN') {
            throw new AppError(
                'ADMIN role cannot be deleted.',
                400
            );
        }
        await RoleRepository.softDeleteRole(roleId.id);

        return {
            message: 'Role deleted successfully.',
        };
    }
}