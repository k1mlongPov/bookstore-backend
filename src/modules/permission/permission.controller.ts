import {Request,Response,NextFunction} from "express";
import {createPermissionSchema, updatePermissionSchema} from "./permission.schema";
import {PermissionService} from "./permission.service";
import {idParamSchema} from "../../shared/validations/common.schema";

export const createPermissionCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const body = createPermissionSchema.parse(req.body);
        const result = await PermissionService.createPermission(body);
        res.status(201).json({
            success: true,
            message: `Permission created successfully.`,
            data: result
        })
    }catch (e) {
        next(e);
    }
}

export const getPermissionByIdCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const params = idParamSchema.parse(req.params);
        const permission = await PermissionService.findPermissionById({id: params.id});

        res.status(200).json({
            success: true,
            data: permission,
        })
    }catch (e) {
        next(e);
    }
}

export const getAllPermissionsCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const permissions = await PermissionService.findAllPermissions();
        res.status(200).json({
            success: true,
            data: permissions,
        })
    }catch (e) {
        next(e);
    }
}

export const updatePermissionCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const params = idParamSchema.parse(req.params);
        const body = updatePermissionSchema.parse(req.body);

        const permission = await PermissionService.updatePermission(
            params,
            body,
        );
    }catch (e) {
        next(e);
    }
}