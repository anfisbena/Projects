import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.get('/login', userController.loginScreen);
router.get('/logout',userController.logout)
router.get('/profile',userController.profile)
router.get('/register',userController.registerScreen);

router.post('/login',userController.login)
router.post('/register',userController.register)

router.get('/auth/github',userController.githubAuthenticate);

router.get('/auth/github/success', userController.githubSuccess);


export default router;