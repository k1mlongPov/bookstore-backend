import {assignRoleSchema} from "./user-role.schema";
import {UserRoleService} from "./user-role.service";
import {asyncHandler} from "../../utils/asyncHandler";

export const assignUserRoleCtrl = asyncHandler(async (req,res) => {
    const body = assignRoleSchema.parse(req.body);
    const result = await UserRoleService.assignRole(body);
    res.status(201).json({
        success: true,
        message: 'Role assigned successfully.',
        data: result,
    });
})

export const getUserRoleCtrl = asyncHandler(async (req,res) => {
    const body = assignRoleSchema.parse(req.body);
    const result = await UserRoleService.findUserRole(body);
    res.status(201).json({
        success: true,
        message: 'User role retrieved successfully.',
        data: result,
    })
})

export const getAllUserRoleCtrl = asyncHandler(async (req,res) => {
    const result = await UserRoleService.findAllUserRole();

    res.status(200).json({
        success: true,
        message: 'User roles retrieved successfully.',
        data: result,
    })
})