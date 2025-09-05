import { Router } from 'express';
import { authRoutes } from './authRoutes.js';
import { credentialRoutes } from './credentialRoutes.js';
import { userRoutes } from './userRoutes.js';
import { healthRoutes } from './healthRoutes.js';

const router = Router();

// Rotas públicas
router.use(healthRoutes);
router.use(authRoutes);

// Rotas protegidas
router.use('/credentials', credentialRoutes);
router.use(userRoutes);

export { router };
