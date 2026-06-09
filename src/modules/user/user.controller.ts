import {UserService} from "./user.service";
import {createUserSchema, updateUserSchema} from "./user.schema";
import {idParamSchema, paginationSchema} from "../../shared/validations/common.schema";
import {asyncHandler} from "../../utils/asyncHandler";

export const getAllUsersCtrl = asyncHandler(async (req, res) => {
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
})
export const getUserByIdCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
    const user = await UserService.getUserById({id: params.id});
    res.status(200).json({
        success: true,
        data: user,
    });
})
export const createUserCtrl = asyncHandler(async (req, res) => {
    const body = createUserSchema.parse(req.body);
    const newUser = await UserService.createUser(body);
    res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: newUser
    });
})
export const updateUserCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
    const body = updateUserSchema.parse(req.body);
    const user = await UserService.updateUser({id: params.id}, body);
    res.status(200).json({
        status: "success",
        message: "User updated successfully",
        data: user
    })
})
export const deleteUserCtrl = asyncHandler(async (req, res) => {
    const params = idParamSchema.parse(req.params);
    await UserService.deleteUser({id: params.id});
    res.status(204).json();
})