import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.js';
import { authMiddleware } from '../middlewares/auth.js';
const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
export default router;
//# sourceMappingURL=auth.js.map