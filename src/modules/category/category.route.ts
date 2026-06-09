import {Router} from "express";
import {authMiddleware} from "../../middleware/auth.middleware";
import {
    createCategoryCtrl,
    deleteCategoryCtrl,
    getCategoriesCtrl,
    getCategoryByIdCtrl,
    restoreCategoryCtrl,
    updateCategoryCtrl
} from "./catogory.controller";

const router = Router();
router.use(authMiddleware);

router.post(
    '/',
    createCategoryCtrl,
)

router.get(
    '/:id',
    getCategoryByIdCtrl
)

router.get(
    '/',
    getCategoriesCtrl
)

router.patch('/:id', updateCategoryCtrl);

router.delete('/:id', deleteCategoryCtrl);

router.patch('/:id/restored', restoreCategoryCtrl);

export default router;