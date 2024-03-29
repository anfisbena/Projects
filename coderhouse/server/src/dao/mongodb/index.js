import mongoose from 'mongoose';
import cartDAO from './cart.dao.js';
import productDAO from './product.dao.js';
import userDAO from './user.dao.js';
import orderDAO from './order.dao.js';
import {config} from '../../config/config.js';
import CartModel from './models/carts.model.js';
import ProductModel from './models/product.model.js';
import UserModel from './models/user.model.js';
import OrderModel from './models/order.model.js'

const {mongo}=config;
const DBconnection=mongoose.connect(mongo.url);

export const CartDAO=new cartDAO(DBconnection,CartModel);
export const ProductDAO=new productDAO(DBconnection,ProductModel);
export const UserDAO=new userDAO(DBconnection,UserModel,CartDAO);
export const OrderDAO=new orderDAO(DBconnection,OrderModel);

export default {CartDAO,ProductDAO,UserDAO,OrderDAO};