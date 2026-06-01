import {Router} from "express";
import {getCurrentUserCtrl, loginCtrl} from "./auth.controller";
import {authMiddleware} from "../../middleware/auth.middleware";

const router = Router();

router.get('/me', authMiddleware, getCurrentUserCtrl);
router.post('/login', loginCtrl);

export default router;