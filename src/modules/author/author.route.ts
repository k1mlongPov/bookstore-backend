import {Router} from "express";
import {authMiddleware} from "../../middleware/auth.middleware";
import {
    createAuthorCtrl,
    getAllAuthorsCtrl,
    getAuthorByIdCtrl,
    restoreAuthorCtrl,
    softDeleteAuthorCtrl,
    updateAuthorCtrl
} from "./author.controller";

const router = Router();

router.use(authMiddleware);

router.post(
    '/',
    createAuthorCtrl
)

router.get(
    '/',
    getAllAuthorsCtrl
)

router.get(
    '/:id',
    getAuthorByIdCtrl
)

router.patch(
    '/:id',
    updateAuthorCtrl
)

router.delete(
    '/:id',
    softDeleteAuthorCtrl
)

router.patch(
    '/:id/restore',
    restoreAuthorCtrl
)

export default router;