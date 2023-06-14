import cartService from "./cart.service.js";
import productService from "./product.service.js";
import userService from "./user.service.js";
import orderService from "./order.service.js";
import {CartRepository,ProductRepository,UserRepository,OrderRepository} from "../repositories/index.js";
import { validatePassword } from "../utils.js";

export const CartService = new cartService(CartRepository);
export const ProductService = new productService(ProductRepository);
export const UserService = new userService(UserRepository,validatePassword);
export const OrderService = new orderService(OrderRepository);

export default {CartService,ProductService,UserService,OrderService};