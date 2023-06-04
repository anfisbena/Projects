import mongoose from 'mongoose';
import {mongoDB} from '../../config/config.js';
import UserModel from './models/user.model.js';
import {hash} from '../../utils.js'

export default class User {
  constructor(){
    mongoose.connect(mongoDB)
  }

  getUser(email){
    return UserModel.findOne({email:email});
  }

  async addUser(user){
    try{
      const userExist=await UserModel.findOne({email:user.email}).lean()
      if(userExist){
      return {status:400,result:'error',payload:'user already exists'}
      }
      else{
        const newUser=
        {
          first_name:user.first_name,
          last_name:user.last_name,
          email:user.email,
          password:hash(user.password),
          role:user.role,
        };
        const userCreated=await UserModel.create(newUser)
        const cartCreated=await this.createCart(userCreated._id)
        await UserModel.findByIdAndUpdate(userCreated._id,{cart:cartCreated.payload._id})
        
        return {status:201,result:'ok',payload:'user created'}
      }
    }
    catch(error){
      console.log(error)
      return {status:500,result:'error',payload:'internal error'}
    }
  }
}