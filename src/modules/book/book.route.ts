import {Router} from "express";
import {authMiddleware} from "../../middleware/auth.middleware";
import {
    createBookCtrl,
    getAllBooksCtrl,
    getBookByIdCtrl,
    restoreBookCtrl,
    softDeleteBookCtrl,
    updateBookCtrl
} from "./book.controller";

const router = Router();

router.use(authMiddleware);

router.post(
    '/',
    createBookCtrl,
)

router.get(
    '/',
    getAllBooksCtrl
)

router.get(
    '/:id',
    getBookByIdCtrl,
)

router.patch(
    '/:id',
    updateBookCtrl,
)

router.delete(
    '/:id',
    softDeleteBookCtrl,
)

router.patch(
    '/:id/retore',
    restoreBookCtrl,
)

export default router;