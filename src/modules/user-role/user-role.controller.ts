import {NextFunction, Request, Response} from "express";
import {assignRoleSchema} from "./user-role.validation";
import {UserRoleRepository} from "./user-role.repository";

export const assignUserRoleCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const body = assignRoleSchema.parse(req.body);
        const result = await UserRoleRepository.assignRole(body.userId, body.roleId);
        res.status(201).json({
            success: true,
            message: 'Role assigned successfully.',
            data: result,
        });
    }catch(err){
        next(err);
    }
}

export const getUserRoleCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const body = assignRoleSchema.parse(req.body);
        const result = await UserRoleRepository.findUserRole(body.userId, body.roleId);
        res.status(201).json({
            success: true,
            message: 'User role retrieved successfully.',
            data: result,
        })
    }catch(err){
        next(err);
    }
}