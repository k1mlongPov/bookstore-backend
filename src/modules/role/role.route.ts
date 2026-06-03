import {Router} from "express";
import {createRoleCtrl, deleteRoleCtrl, getAllRolesCtrl, getRoleByIdCtrl, updateRoleCtrl} from "./role.controller";
import {authMiddleware} from "../../middleware/auth.middleware";
import {authorize} from "../../middleware/authorize.middleware";

const router = Router();

router.get(
    '/',
    authMiddleware,
    authorize("ADMIN"),
    getAllRolesCtrl
);

router.get(
    '/:id',
    authMiddleware,
    authorize("role:read"),
    getRoleByIdCtrl
);

router.post(
    '/',
    authMiddleware,
    authorize("role:create"),
    createRoleCtrl
);

router.patch(
    '/:id',
    authMiddleware,
    authorize("role:update"),
    updateRoleCtrl
);

router.delete(
    '/:id',
    authMiddleware,
    authorize("role:delete"),
    deleteRoleCtrl
);

export default router;