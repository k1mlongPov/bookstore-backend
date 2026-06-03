import {Router} from "express";
import {assignRolePermissionCtrl} from "./role-permission.controller";
import {authMiddleware} from "../../middleware/auth.middleware";
import {authorize} from "../../middleware/authorize.middleware";

const router = Router();

router.post("/",
    authMiddleware,
    authorize("role:assign"),
    assignRolePermissionCtrl
);

export default router;