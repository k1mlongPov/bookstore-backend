import {Router} from "express";
import {createRoleCtrl, deleteRoleCtrl, getAllRolesCtrl, getRoleByIdCtrl, updateRoleCtrl} from "./role.controller";
import {authMiddleware} from "../../middleware/auth.middleware";
import {authorize} from "../../middleware/authorize.middleware";

const router = Router();

router.use(authMiddleware);

router.get(
    '/',
    authorize("role:read"),
    getAllRolesCtrl
);

router.get(
    '/:id',
    authorize("role:read"),
    getRoleByIdCtrl
);

router.post(
    '/',
    authorize("role:create"),
    createRoleCtrl
);

router.patch(
    '/:id',
    authorize("role:update"),
    updateRoleCtrl
);

router.delete(
    '/:id',
    authorize("role:delete"),
    deleteRoleCtrl
);

export default router;