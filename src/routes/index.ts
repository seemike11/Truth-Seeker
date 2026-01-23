import { Router } from 'express';
import { FactCheckController, UserController } from '../controllers';

const router = Router();
const userController = new UserController();
const factCheckController = new FactCheckController();

router.post('/users', userController.createUser.bind(userController));
router.get('/users/:id', userController.getUser.bind(userController));
router.post('/fact-check', factCheckController.checkStatement.bind(factCheckController));

export default router;
