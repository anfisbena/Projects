import { Router } from "express";
import {UserController} from "../controllers/index.js";



const router = Router();

router.get('/login', UserController.getLogin);
router.get('/logout',UserController.getLogout)
router.get('/profile',UserController.getProfile)
router.get('/register',UserController.getRegister);
router.get('/recover',UserController.getRecover)
router.get('/recover/:userToken',UserController.getNewPassword)
router.get('/auth/github',UserController.githubAuthenticate);
router.get('/auth/github/success',UserController.githubSuccess)

router.post('/login',UserController.setLogin)
router.post('/register',UserController.setRegister)
router.post('/recover',UserController.setRecover)

router.put('/recover/:userToken',UserController.setNewPassword)

export default router;