import {Router} from "express";
import {assignUserRoleCtrl, getAllUserRoleCtrl} from "./user-role.controller";
import {authMiddleware} from "../../middleware/auth.middleware";
import {authorize} from "../../middleware/authorize.middleware";

const router = Router();

router.get('/',
    authMiddleware,
    authorize("user-role:read"),
    getAllUserRoleCtrl
);
router.post('/',
    authMiddleware,
    authorize("user-role:assign"),
    assignUserRoleCtrl
);

export default router;