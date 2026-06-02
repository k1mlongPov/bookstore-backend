import {Router} from "express";
import {getCurrentUserCtrl, loginCtrl, registerCtrl} from "./auth.controller";
import {authMiddleware} from "../../middleware/auth.middleware";

const router = Router();

router.get('/me', authMiddleware, getCurrentUserCtrl);
router.post('/login', loginCtrl);
router.post('/register', registerCtrl);

export default router;