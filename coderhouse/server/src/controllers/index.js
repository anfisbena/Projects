import userController from './user.controller.js';
import productController from './product.controller.js';
import orderController from './order.controller.js';
import homeController from './home.controller.js';
import {OrderService,ProductService,UserService} from "../services/index.js";

const UserController=new userController(UserService);
const ProductController=new productController(ProductService);
const OrderController=new orderController(OrderService);
const HomeController=new homeController();


export {UserController,ProductController,OrderController,HomeController}