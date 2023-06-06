import cartRepository from './cart.repository.js';
import productRepository from './product.repository.js';
import userRepository from './user.repository.js';
import dao from '../dao/dbSelector.js'

export const CartRepository=new cartRepository(dao);
export const ProductRepository=new productRepository(dao);
export const UserRepository=new userRepository(dao);

export default {CartRepository,ProductRepository,UserRepository};