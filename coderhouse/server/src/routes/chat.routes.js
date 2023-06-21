import {Router} from 'express';
import {ChatController} from '../controllers/index.js';

const router=Router();

router.get('/',ChatController.getChat);

export default router;