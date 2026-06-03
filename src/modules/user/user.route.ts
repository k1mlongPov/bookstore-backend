import {Router} from "express";
import {createUserCtrl, deleteUserCtrl, getAllUsersCtrl, getUserByIdCtrl, updateUserCtrl,} from "./user.controller";
import {authorize} from "../../middleware/authorize.middleware";
import {authMiddleware} from "../../middleware/auth.middleware";

const router = Router();

router.get(
    '/',
    authMiddleware,
    authorize("user:read"),
    getAllUsersCtrl
);
router.get(
    '/:id',
    authMiddleware,
    authorize("user:read"),
    getUserByIdCtrl
);
router.post('/',
    authMiddleware,
    authorize("user:create"),
    createUserCtrl
);
router.patch('/:id',
    authMiddleware,
    authorize("user:update"),
    updateUserCtrl
);
router.delete('/:id',
    authMiddleware,
    authorize("user:delete"),
    deleteUserCtrl
);

export default router;