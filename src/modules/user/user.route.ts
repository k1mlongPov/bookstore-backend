import {Router} from "express";
import {createUserCtrl, deleteUserCtrl, getAllUsersCtrl, getUserByIdCtrl, updateUserCtrl,} from "./user.controller";
import {authorize} from "../../middleware/authorize.middleware";
import {authMiddleware} from "../../middleware/auth.middleware";

const router = Router();

router.get(
    '/',
    authMiddleware,
    authorize("ADMIN"),
    getAllUsersCtrl
);
router.get(
    '/:id',
    authMiddleware,
    authorize("ADMIN", "STAFF", "CUSTOMER"),
    getUserByIdCtrl
);
router.post('/',
    authMiddleware,
    authorize("ADMIN"),
    createUserCtrl
);
router.patch('/:id',
    authMiddleware,
    authorize("ADMIN"),
    updateUserCtrl
);
router.delete('/:id',
    authMiddleware,
    authorize("ADMIN"),
    deleteUserCtrl
);

export default router;