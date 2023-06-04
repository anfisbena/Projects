import { Router } from "express";
import orderController from "../controllers/order.controller.js";

const router = Router();

router.get('/',orderController.getOrders);
router.get('/:oid',orderController.getOrderById);
router.post('/',orderController.addOrder);
router.put('/:oid',orderController.updateOrder);
router.delete('/:oid',orderController.deleteOrder);

export default router