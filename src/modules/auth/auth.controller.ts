import {loginSchema} from "./auth.schema";
import {AuthService} from "./auth.service";
import {createUserSchema} from "../user/user.schema";
import {asyncHandler} from "../../utils/asyncHandler";

export const loginCtrl = asyncHandler(async (req, res)=> {
    const body = loginSchema.parse(req.body);
    const result = await AuthService.login(body);
    res.status(200).json({
        status: 'success',
        message: 'Authentication successful',
        data: result,
    });
})

export const getCurrentUserCtrl = asyncHandler(async (req, res)=> {
    res.json(req.user);
})

export const registerCtrl = asyncHandler(async (req, res)=> {
    const body = createUserSchema.parse(req.body);
    const result = await AuthService.register(body);
    res.status(201).json({
        status: 'success',
        message: 'Registration successful',
        data: result,
    })
})
