import userController from './user.controller.js';
import productController from './product.controller.js';
import cartController from './cart.controller.js';
import homeController from './home.controller.js';
import chatController from './chat.controller.js';
import mockingController from './mocking.controller.js';
import {CartService,ProductService,UserService} from "../services/index.js";

const UserController=new userController(UserService);
const ProductController=new productController(ProductService);
const CartController=new cartController(CartService);
const HomeController=new homeController();
const ChatController=new chatController();
const MockingController=new mockingController();


export {UserController,ProductController,CartController,HomeController,ChatController,MockingController}