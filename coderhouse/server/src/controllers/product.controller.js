import jwt from "jsonwebtoken";
import {config} from "../config/config.js";
import {ProductService} from "../services/index.js"
import { logger } from "../utils/logger.js";

const {jwtconfig}=config

export default class ProductController{
  constructor(service){
    this.service=service
  }
  
  async getProducts(req,res){
    try{
      logger.http('TESTEO') //logger
      const query=req.query.query||{};
      const options=
        {
          lean:true,
          limit: parseInt(req.query.limit)||5,
          page: parseInt(req.query.page)||1,
          sort:req.query.sort?{price:req.query.sort}:{}
        };
        // const data=await this.service.getProducts(query,options);
        const data=await ProductService.getProducts(query,options);
        const user=jwt.verify(req.cookies.coderCookie,jwtconfig.secret)
        return res.render('products', {
          title: 'products',
          products: data.docs,
          user:user,
          currentPage:data.page,
          totalPages:data.totalPages,
          hasPrevPage:data.hasPrevPage,
          hasNextPage:data.hasNextPage,
          prevLink:data.prevPage?`http://localhost:8080/products?page=${data.prevPage}`:null,
          nextLink:data.nextPage?`http://localhost:8080/products?page=${data.nextPage}`:null
        });
    }
    catch(error){
      console.log(error)
      return null
    }
  }
  async getProductById(req,res){
    try{
      const id = req.params.pid;
      const query={_id:id};
      const options=
        {
          lean:true,
          limit: parseInt(req.query.limit)||5,
          page: parseInt(req.query.page)||1,
          sort:req.query.sort?{price:req.query.sort}:{}
        };
        // const data=await this.service.getProducts(query,options);
        const data=await ProductService.getProducts(query,options);
        const user=jwt.verify(req.cookies.coderCookie,jwtconfig.secret)
        return res.render('products', {
          title: 'products',
          products: data.docs,
          user:user,
          currentPage:data.page,
          totalPages:data.totalPages,
          hasPrevPage:data.prevLink,
          hasNextPage:data.nextLink,
          prevLink:data.prevPage?`http://localhost:8080/api/products?page=${data.prevPage}`:null,
          nextLink:data.nextPage?`http://localhost:8080/api/products?page=${data.nextPage}`:null
        });
    }
    catch(error){
      console.log(error)
      return null
    }

  }
  async addProduct(req,res){
    try{
      const {title,description,code,price,status,stock,category}=req.body
      const thumbnails=req.files.map((file)=>file.filename)
      // const response=await this.service.addProduct(title,description,code,price,status,stock,category)
      const response=await ProductService.addProduct(title,description,code,price,status,stock,category)
      return res.send({status:response.status,payload:response.payload})
    }
    catch(error){
      console.log(error)
      return null
    }
  }
  async updateProduct(req,res){
      const id = req.params.pid;
      const {title,description,code,price,status,stock,category}=req.body
      // const response=await this.service.updateProduct(id,title,description,code,price,status,stock,category)
      const response=await ProductService.updateProduct(id,title,description,code,price,status,stock,category)
      
      return res.send({status:response.status,payload:response.payload})
  }
  async deleteProduct(req,res){
      try{
        // const response=await this.service.deleteProduct(req.params.pid)
        const response=await ProductService.deleteProduct(req.params.pid)
        return {status:response.status,result:response.result,payload:response.payload}
      }
      catch(error){
        console.log(error)
        return null
      }
  }
  async updateStock(req,res){
    try{

    }
    catch(error){
      console.log(error)
      return null
    }
  }
  async getProductPage(req,res){
    try{
      const user=jwt.verify(req.cookies.coderCookie,jwtconfig.secret)
      if(user.role!=='user'){
        return res.render('401')
      }
      else{
        console.log(user)
        return res.render('addProduct', {
          title: 'addProduct',
          user:user
        });
      }
    }
    catch(error){
      console.log(error)
      return null
    }
  }
}