import {UserRepository} from "../user/user.repository";
import {AppError} from "../../utils/app.error";
import {RoleRepository} from "../role/role.repository";
import {UserRoleRepository} from "./user-role.repository";
import {assignRoleSchema} from "./user-role.validation";

export const UserRoleService = {
    async assignRole(userId: string, roleId: string) {
        const user = await UserRepository.getUserById(userId);
        if(!user) {
            throw new AppError('User not found', 404);
        }
        const role = await RoleRepository.findById(roleId);
        if(!role) {
            throw new AppError('Role not found', 404);
        }

        const existing = await UserRoleRepository.findUserRole(userId,roleId);
        if(existing) {
            throw new AppError('Role already assigned', 404);
        }
        return UserRoleRepository.assignRole(userId, roleId);
    },

    async findUserRole(userId: string, roleId: string) {
        const userRole =
            await UserRoleRepository.findUserRole(
                userId,
                roleId
            );

        if (!userRole) {
            throw new AppError(
                "User role assignment not found",
                404
            );
        }

        return userRole;
    }
}