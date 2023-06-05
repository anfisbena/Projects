import { Router } from "express";
import {UserController} from "../controllers/index.js";



const router = Router();

router.get('/login', UserController.getLogin);
router.get('/logout',UserController.getLogout)
router.get('/profile',UserController.getProfile)
router.get('/register',UserController.getRegister);

router.post('/login',UserController.setLogin)
router.post('/register',UserController.setRegister)

router.get('/auth/github',UserController.githubAuthenticate);

router.get('/auth/github/success',UserController.githubSuccess)

export default router;