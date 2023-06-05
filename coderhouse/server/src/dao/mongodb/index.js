import mongoose from 'mongoose';
import cartDAO from './cart.dao.js';
import productDAO from './product.dao.js';
import userDAO from './user.dao.js';
import {mongoDB} from '../../config/config.js';
import CartModel from './models/carts.model.js';
import ProductModel from './models/product.model.js';
import UserModel from './models/user.model.js';

const DBconnection=mongoose.connect(mongoDB);

export const CartDAO=new cartDAO(DBconnection,CartModel);
export const ProductDAO=new productDAO(DBconnection,ProductModel);
export const UserDAO=new userDAO(DBconnection,UserModel,CartDAO);

export default {CartDAO,ProductDAO,UserDAO};