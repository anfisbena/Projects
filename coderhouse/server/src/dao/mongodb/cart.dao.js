import mongoose from 'mongoose';
import {mongoDB} from '../../config/config.js';
import CartSchema from './models/carts.model.js';


export default class Cart {
  constructor(){
    mongoose.connect(mongoDB)
  }

  async getCart(id){
    try{
      const result=await CartSchema.findById(id).populate('products').lean()
      return {status:200,result:'ok',payload:result}
    }
    catch(error){
      console.log(error);
      return {status:500,result:'error',payload:'internal error'};
    }
  }

  async createCart(userId){
    try{
      const result=await CartSchema.create({uid:userId});
      return {status:200,result:'ok',payload:result}
    }
    catch(error){
      console.log(error);
    }
  }
}