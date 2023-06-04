import mongoose from 'mongoose';
import {mongoDB} from '../../config/config.js';
import ProductModel from './models/product.model.js';

export default class Product {
  constructor(){
    mongoose.connect(mongoDB)
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
}