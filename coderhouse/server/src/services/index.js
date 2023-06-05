import orderServie from "./order.service.js";
import productService from "./product.service.js";
import userService from "./user.service.js";
import {CartRepository,ProductRepository,UserRepository} from "../repositories/index.js";
import { validatePassword } from "../utils.js";

export const OrderService = new orderServie(CartRepository);
export const ProductService = new productService(ProductRepository);
export const UserService = new userService(UserRepository,validatePassword);

export default {OrderService,ProductService,UserService};