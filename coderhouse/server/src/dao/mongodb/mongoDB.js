import mongoose from 'mongoose';
import {mongoDB} from '../../config/config.js';
import UserModel from './models/user.model.js';
import ProductModel from './models/product.model.js';
import CartSchema from './models/carts.model.js';
import {hash} from '../../utils.js'


class mongoConnection {
  constructor(){
    mongoose.connect(mongoDB)
  }

  getUser(email){
    return UserModel.findOne({email:email});
  }

  async addUser(user){
    try{
      const userExist=await UserModel.findOne({email:user.email}).lean()
      console.log(userExist,"User exist")
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
        await this.createCart(userCreated._id)
        return {status:201,result:'ok',payload:'user created'}
      }
    }
    catch(error){
      console.log(error)
      return {status:500,result:'error',payload:'internal error'}
    }
  }

  getProducts(query,options){
    return ProductModel.paginate(query,options);
  }

  async getProductById(id){
    try{
      const result =await ProductModel.findById(id).lean()
      console.log([result])
      return [result]
    }
    catch (error){
      console.log(error)
      return []
    }
  }
  
  addProduct(title,description,code,price,status,stock,category){
    try{
      console.log(title,description,code,price,status,stock,category)
      ProductModel.create(
        {
          title:title,
          description:description,
          code:code,
          price:price,
          status:status,
          stock:stock,
          category:category,
          thumbnails:"https://picsum.photos/200/300"
        }
      );
      return {status:200,result:'ok',payload:'producto agregado'}
    }
    catch(error){
      console.log(error)
      return {status:500,result:'error',payload:'error interno'}
    }
  }
  
  async updateProduct(id,title,description,code,price,status,stock,category){
      try{
        const query ={_id:id}
        const oldProduct=await this.getProductById(id)
        const updatedProduct={
          title: title??oldProduct[0].title,
          description: description??oldProduct[0].description,
          code: code??oldProduct[0].code,
          price: price??oldProduct[0].price,
          status: status??oldProduct[0].status,
          stock: stock??oldProduct[0].stock,
          category:category??oldProduct[0].category,
          thumbnails:oldProduct[0].thumbnails
        }
        const caca=await ProductModel.findByIdAndUpdate(query,updatedProduct)
        console.log(caca)
        return {status:200,result:'ok',payload:'producto actualizado'}  
      }
      catch (error){
      return {status:400,result:'error',payload:'producto no encontrado'}
      }
    }
  
  async deleteProduct(id){
    try{
      await ProductModel.deleteOne({_id:id})
      return {status:200,result:'ok',payload:'producto eliminado'}
    }
    catch(error){
      return {status:400,result:'error',payload:'producto no encontrado'}
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


export const mongo=new mongoConnection();

export default mongo