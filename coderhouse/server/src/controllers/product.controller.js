import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/config.js";
import {ProductService} from "../services/index.js"

export default class ProductController{
  constructor(service){
    this.service=service
  }
  
  async getProducts(req,res){
    try{
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
        const user=jwt.verify(req.cookies.coderCookie,JWT_SECRET)
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
        const user=jwt.verify(req.cookies.coderCookie,JWT_SECRET)
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
}