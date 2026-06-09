import {Router} from "express";
import {authMiddleware} from "../../middleware/auth.middleware";
import {createCategoryCtrl, getCategoriesCtrl, getCategoryByIdCtrl} from "./catogory.controller";

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

export default router;