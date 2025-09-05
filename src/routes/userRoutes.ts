import { Router } from 'express';
import { userController } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.delete('/erase', authenticateToken, userController.deleteUserData);

export { router as userRoutes };
