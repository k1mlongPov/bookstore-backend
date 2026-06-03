import {Router} from "express";
import {authMiddleware} from "../../middleware/auth.middleware";
import {authorize} from "../../middleware/authorize.middleware";
import {createPermissionCtrl, getAllPermissionsCtrl, getPermissionByIdCtrl} from "./permission.controller";

const router = Router();

router.post(
    '/',
    authMiddleware,
    authorize('permission:create'),
    createPermissionCtrl,
)
router.get(
    '/',
    authMiddleware,
    authorize('permission:read'),
    getAllPermissionsCtrl
);
router.get(
    '/:id',
    authMiddleware,
    authorize('permission:read'),
    getPermissionByIdCtrl
);

export default router;