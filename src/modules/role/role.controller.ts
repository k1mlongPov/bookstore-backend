import {NextFunction,Response, Request} from "express";
import {createRoleSchema, updateRoleSchema} from "./role.schema";
import {RoleService} from "./role.service";
import {idParamSchema} from "../../shared/validations/common.schema";

export const createRoleCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = createRoleSchema.parse(req.body);
        const newRole = await RoleService.createRole(body);

        res.status(201).json({
            success: true,
            message: "Role created successfully",
            data: newRole,
        });
    }catch (error) {
        next(error);
    }
}

export const getAllRolesCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const roles = await RoleService.getAllRoles();
        res.status(200).json({
            success: true,
            message: "Role retrieved successfully",
            data: roles,
        })
    }catch (error) {
        next(error);
    }
}

export const getRoleByIdCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const params = idParamSchema.parse(req.params);
        const role = await RoleService.getRoleById({id: params.id});
        res.status(200).json({
            success: true,
            data: role,
        })
    }catch (error) {
        next(error);
    }
}

export const updateRoleCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const params = idParamSchema.parse(req.params);
        const body = updateRoleSchema.parse(req.body);
        const role = await RoleService.updateRole({id: params.id}, body);
        res.status(200).json({
            success: true,
            data: role,
        })
    }catch (e) {
        next(e);
    }
}

export const deleteRoleCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const params = idParamSchema.parse(req.params);
        await RoleService.softDeleteRole({id: params.id});
        res.status(200).json({
            success: true,
            message: "Role deleted successfully",
        })
    }catch (e) {
        next(e);
    }
}