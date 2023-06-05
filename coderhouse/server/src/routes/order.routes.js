import { Router } from "express";
import {OrderController} from "../controllers/index.js";

const router = Router();

router.get('/',OrderController.getOrders);
router.get('/:oid',OrderController.getOrderById);
router.post('/',OrderController.addOrder);
router.put('/:oid',OrderController.updateOrder);
router.delete('/:oid',OrderController.deleteOrder);

export default router