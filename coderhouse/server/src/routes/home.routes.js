import {Router} from 'express';
import {HomeController} from '../controllers/index.js';

const router=Router();

router.get('/',HomeController.homeScreen);

export default router;