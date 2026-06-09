import {createRoleSchema, updateRoleSchema} from "./role.schema";
import {RoleService} from "./role.service";
import {idParamSchema} from "../../shared/validations/common.schema";
import {asyncHandler} from "../../utils/asyncHandler";

export const createRoleCtrl = asyncHandler(async (req, res) => {
    const body = createRoleSchema.parse(req.body);
    const newRole = await RoleService.createRole(body);

    res.status(201).json({
        success: true,
        message: "Role created successfully",
        data: newRole,
    });
})

export const getAllRolesCtrl = asyncHandler(async (req, res) => {
    const roles = await RoleService.getAllRoles();
    res.status(200).json({
        success: true,
        message: "Role retrieved successfully",
        data: roles,
    })
})

export const getRoleByIdCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
    const role = await RoleService.getRoleById({id: params.id});
    res.status(200).json({
        success: true,
        data: role,
    })
})

export const updateRoleCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
    const body = updateRoleSchema.parse(req.body);
    const role = await RoleService.updateRole({id: params.id}, body);
    res.status(200).json({
        success: true,
        data: role,
    })
})

export const deleteRoleCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
    await RoleService.softDeleteRole({id: params.id});
    res.status(200).json({
        success: true,
        message: "Role deleted successfully",
    })
})