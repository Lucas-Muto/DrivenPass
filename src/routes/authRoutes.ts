import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { signUpSchema, signInSchema } from '../schemas/authSchemas.js';

const router = Router();

router.post('/sign-up', validateSchema(signUpSchema), authController.signUp);
router.post('/sign-in', validateSchema(signInSchema), authController.signIn);

export { router as authRoutes };
