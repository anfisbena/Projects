import { Router } from "express";
import {CartController} from "../controllers/index.js";

const router = Router();

router.get('/',CartController.getOrders);
router.get('/:oid',CartController.getOrderById);
router.post('/',CartController.addOrder);
router.put('/:oid',CartController.updateOrder);
router.delete('/:oid',CartController.deleteOrder);

export default router