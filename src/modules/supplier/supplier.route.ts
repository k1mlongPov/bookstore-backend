import {Router} from "express";
import {authMiddleware} from "../../middleware/auth.middleware";
import {
    createSupplierCtrl,
    getAllSuppliersCtrl,
    getSupplierByIdCtrl, restoreSupplierCtrl,
    softDeleteSupplierCtrl,
    updateSupplierCtrl
} from "./supplier.controller";

const router = Router();

router.use(authMiddleware);

router.post(
    '/',
    createSupplierCtrl,
)

router.get(
    '/',
    getAllSuppliersCtrl,
)

router.get(
    '/:id',
    getSupplierByIdCtrl,
)

router.patch(
    '/:id',
    updateSupplierCtrl,
)

router.delete(
    '/:id',
    softDeleteSupplierCtrl,
)

router.patch(
    '/:id/restore',
    restoreSupplierCtrl,
)

export default router;