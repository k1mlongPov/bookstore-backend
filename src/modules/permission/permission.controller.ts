import {createPermissionSchema, updatePermissionSchema} from "./permission.schema";
import {PermissionService} from "./permission.service";
import {idParamSchema} from "../../shared/validations/common.schema";
import {asyncHandler} from "../../utils/asyncHandler";

export const createPermissionCtrl = asyncHandler(async (req, res) => {
    const body = createPermissionSchema.parse(req.body);
    const result = await PermissionService.createPermission(body);
    res.status(201).json({
        success: true,
        message: `Permission created successfully.`,
        data: result
    })
})

export const getPermissionByIdCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
    const permission = await PermissionService.findPermissionById({id: params.id});

    res.status(200).json({
        success: true,
        data: permission,
    })
})

export const getAllPermissionsCtrl = asyncHandler(async (req, res) => {
    const permissions = await PermissionService.findAllPermissions();
    res.status(200).json({
        success: true,
        data: permissions,
    })
})

export const updatePermissionCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
    const body = updatePermissionSchema.parse(req.body);

    const permission = await PermissionService.updatePermission(
        params,
        body,
    );
})