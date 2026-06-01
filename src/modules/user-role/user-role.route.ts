import {Router} from "express";
import {assignUserRoleCtrl, getUserRoleCtrl} from "./user-role.controller";

const router = Router();

router.get('/', getUserRoleCtrl);
router.post('/', assignUserRoleCtrl);

export default router;