import {Request,Response,NextFunction} from "express";
import {RolePermissionService} from "./role-permission.service";
import {assignRolePermissionSchema} from "./role-permission.schema";

export const assignRolePermissionCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = assignRolePermissionSchema.parse(req.body);
        const result = await RolePermissionService.assignRolePermission(body);

        res.status(201).json({
            status: "success",
            message: 'Assigned role permission successfully.',
            data: result,
        });
    }catch (e) {
        next(e);
    }
}