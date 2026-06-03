import {UserRepository} from "../user/user.repository";
import {AppError} from "../../utils/app.error";
import {RoleRepository} from "../role/role.repository";
import {UserRoleRepository} from "./user-role.repository";
import {AssignRoleInput} from "./user-role.schema";

export const UserRoleService = {
    async assignRole(data: AssignRoleInput) {
        const user = await UserRepository.getUserById(data.userId);
        if(!user) {
            throw new AppError('User not found', 404);
        }
        const role = await RoleRepository.findById(data.roleId);
        if(!role) {
            throw new AppError('Role not found', 404);
        }

        const existing = await UserRoleRepository.findUserRole(data);
        if(existing) {
            throw new AppError('Role already assigned', 404);
        }
        return UserRoleRepository.assignRole(data);
    },

    async findUserRole(data: AssignRoleInput) {
        const userRole =
            await UserRoleRepository.findUserRole(data);

        if (!userRole) {
            throw new AppError(
                "User role assignment not found",
                404
            );
        }

        return userRole;
    },

    async findAllUserRole(){
        const userRole = await  UserRoleRepository.findAllUserRole();
        if(!userRole) {
            throw new AppError('User role assignment not found', 404);
        }
        return userRole;
    }
}