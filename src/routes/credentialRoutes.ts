import { Router } from 'express';
import { credentialController } from '../controllers/credentialController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { validateNumericParam } from '../middlewares/validateParams.js';
import { credentialSchema } from '../schemas/credentialSchemas.js';

const router = Router();

// Todas as rotas de credenciais precisam de autenticação
router.use(authenticateToken);

router.post('/', validateSchema(credentialSchema), credentialController.create);
router.get('/', credentialController.findAll);
router.get('/:id', validateNumericParam('id'), credentialController.findById);
router.put('/:id', validateNumericParam('id'), validateSchema(credentialSchema), credentialController.update);
router.delete('/:id', validateNumericParam('id'), credentialController.delete);

export { router as credentialRoutes };
