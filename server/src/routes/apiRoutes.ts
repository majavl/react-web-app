import {authenticateToken} from "../middleware/auth";
import * as userController from '../controllers/userController';

import {Router} from 'express';

const router = Router();

router.get('/user', authenticateToken, userController.getUser);

router.post('/register', userController.createUser);

export default router;