import { Router } from "express";
import {CartController} from "../controllers/index.js";
import {cartRigths} from "../middlewares/authentication.js";

const router = Router();

router.get('/',cartRigths,CartController.getOrders);
router.get('/:oid',cartRigths,CartController.getOrderById);
router.post('/',cartRigths,CartController.addOrder);
router.post('/purchase',cartRigths,CartController.checkout)
router.put('/:oid',cartRigths,CartController.updateOrder);
router.delete('/:oid',cartRigths,CartController.deleteOrder);

export default router