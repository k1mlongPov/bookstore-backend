import {Response, Request, NextFunction} from "express";
import {UserService} from "./user.service";
import {createUserSchema, updateUserSchema} from "./user.schema";
import {idParamSchema, paginationSchema} from "../../shared/validations/common.schema";

export const getAllUsersCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const query = paginationSchema.parse(req.query);
        const result = await UserService.getAllUsers(
            query.page,
            query.limit,
        )
        res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination,
        })
    }catch (error) {
        next(error);
    }
}
export const getUserByIdCtrl = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const params = idParamSchema.parse(req.params);
        const user = await UserService.getUserById({id: params.id});
        res.status(200).json({
            success: true,
            data: user,
        });
    }catch (error) {
        next(error);
    }
}
export const createUserCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = createUserSchema.parse(req.body);
        const newUser = await UserService.createUser(body);
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: newUser
        });
    }catch (error) {
        next(error);
    }
}
export const updateUserCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const params = idParamSchema.parse(req.params);
        const body = updateUserSchema.parse(req.body);
       const user = await UserService.updateUser({id: params.id}, body);
        res.status(200).json({
            status: "success",
            message: "User updated successfully",
            data: user
        })
    }catch (error) {
        next(error);
    }
}
export const deleteUserCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const params = idParamSchema.parse(req.params);
        await UserService.deleteUser({id: params.id});
        res.status(204).json();
    }catch (error) {
        next(error);
    }
}