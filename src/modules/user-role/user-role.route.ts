import {Router} from "express";
import {assignUserRoleCtrl, getUserRoleCtrl} from "./user-role.controller";
import {authMiddleware} from "../../middleware/auth.middleware";
import {authorize} from "../../middleware/authorize.middleware";

const router = Router();

router.get('/',
    authMiddleware,
    authorize("ADMIN"),
    getUserRoleCtrl
);
router.post('/',
    authMiddleware,
    authorize("ADMIN"),
    assignUserRoleCtrl
);

export default router;