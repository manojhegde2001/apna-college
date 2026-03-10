import { Router } from 'express';
import { getProblems, toggleProgress } from '../controllers/problems.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.get('/', getProblems);
router.post('/toggle', authMiddleware, toggleProgress);

export default router;
