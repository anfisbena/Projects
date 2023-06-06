import cartService from "./cart.service.js";
import productService from "./product.service.js";
import userService from "./user.service.js";
import {CartRepository,ProductRepository,UserRepository} from "../repositories/index.js";
import { validatePassword } from "../utils.js";

export const CartService = new cartService(CartRepository);
export const ProductService = new productService(ProductRepository);
export const UserService = new userService(UserRepository,validatePassword);

export default {CartService,ProductService,UserService};