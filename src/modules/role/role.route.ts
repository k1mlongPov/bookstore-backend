import {Router} from "express";
import {createRoleCtrl, deleteRoleCtrl, getAllRolesCtrl, getRoleByIdCtrl, updateRoleCtrl} from "./role.controller";

const router = Router();

router.get('/', getAllRolesCtrl);
router.get('/:id', getRoleByIdCtrl);
router.post('/', createRoleCtrl);
router.patch('/:id', updateRoleCtrl);
router.delete('/:id', deleteRoleCtrl);

export default router;