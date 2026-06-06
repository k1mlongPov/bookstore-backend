import {Router} from "express";
import {authMiddleware} from "../../middleware/auth.middleware";
import {authorize} from "../../middleware/authorize.middleware";
import {
    createPublisherCtrl,
    deletePublisherCtrl,
    getAllPublishersCtrl,
    getPublisherByIdCtrl,
    updatePublisherCtrl
} from "./publisher.controller";

const router = Router();

router.use(authMiddleware);

router.get(
    '/',
    authorize('publisher:read'),
    getAllPublishersCtrl
);
router.get(
    '/:id',
    authorize('publisher:read'),
    getPublisherByIdCtrl,
);
router.post(
    '/',
    authorize("publisher:create"),
    createPublisherCtrl
);
router.patch(
    '/:id',
    authorize('publisher:update'),
    updatePublisherCtrl
);
router.delete(
    '/:id',
    authorize('publisher:delete'),
    deletePublisherCtrl
);

export default router;