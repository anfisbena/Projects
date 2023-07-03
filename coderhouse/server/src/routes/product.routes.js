import { Router } from "express";
import {ProductController} from "../controllers/index.js";
import {productRights} from "../middlewares/authentication.js";


const router = Router();

router.get("/addproduct",ProductController.getProductPage)
router.get("/",ProductController.getProducts);
router.get('/:pid',ProductController.getProductById);
router.post('/',productRights,ProductController.addProduct);
router.put('/:pid',productRights,ProductController.updateProduct);
router.delete('/:pid',productRights,ProductController.deleteProduct);

export default router