import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.get('/login', userController.getLogin);
router.get('/logout',userController.getLogout)
router.get('/profile',userController.getProfile)
router.get('/register',userController.getRegister);

router.post('/login',userController.setLogin)
router.post('/register',userController.setRegister)

router.get('/auth/github',userController.githubAuthenticate);

router.get('/auth/github/success',userController.githubSuccess)

export default router;