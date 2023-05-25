import mongoose from 'mongoose';
import {mongoDB} from '../../config/config.js';
import UserModel from './models/user.model.js';
import ProductModel from './models/product.model.js';


class mongoConnection {
  constructor(){
    mongoose.connect(mongoDB)
  }

  getUser(email){
    return UserModel.findOne({email:email});
  }
  getProducts(query,options){
    return ProductModel.paginate(query,options);
  }
}


export const mongo=new mongoConnection();

export default mongo