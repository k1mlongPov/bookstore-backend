import {RolePermissionService} from "./role-permission.service";
import {assignRolePermissionSchema} from "./role-permission.schema";
import {asyncHandler} from "../../utils/asyncHandler";

export const assignRolePermissionCtrl = asyncHandler(async  (req, res) => {
    const body = assignRolePermissionSchema.parse(req.body);
    const result = await RolePermissionService.assignRolePermission(body);

    res.status(201).json({
        status: "success",
        message: 'Assigned role permission successfully.',
        data: result,
    });
})