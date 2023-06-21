import { Router } from "express";
import {MockingController} from "../controllers/index.js";

const router = Router();

router.get('/',MockingController.getMockingData);

export default router;