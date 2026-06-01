import {NextFunction, Request, Response} from "express";
import {loginSchema} from "./auth.validation";
import {AuthService} from "./auth.service";
import {AuthUser} from "./auth.types";

export const loginCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const body = loginSchema.parse(req.body);
        const result = await AuthService.login(body);
        res.status(200).json({
            status: 'success',
            message: 'Authentication successful',
            data: result,
        });
    }catch(err){
        next(err);
    }
}

export const getCurrentUserCtrl = async (
    req: Request,
    res: Response
): Promise<void> => {
    const user = (req as Request & {
        user?: AuthUser;
    }).user;

    res.json({
        success: true,
        data: user
    });
};