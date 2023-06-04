import Cart from './cart.dao.js';
import Product from './product.dao.js';
import User from './user.dao.js';

export const cart=new Cart();
export const product=new Product();
export const user=new User();

export default {cart,product,user};