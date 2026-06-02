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
    authorize("ADMIN", "STAFF", "CUSTOMER"),
    getRoleByIdCtrl
);

router.post(
    '/',
    authMiddleware,
    authorize("ADMIN"),
    createRoleCtrl
);

router.patch(
    '/:id',
    authMiddleware,
    authorize("ADMIN"),
    updateRoleCtrl
);

router.delete(
    '/:id',
    authMiddleware,
    authorize("ADMIN"),
    deleteRoleCtrl
);

export default router;