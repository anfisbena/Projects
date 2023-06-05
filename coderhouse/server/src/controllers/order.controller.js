import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/config.js";
import {OrderService} from "../services/index.js"

export default class OrderController{
  constructor(service){
    this.service=service
  }
  
  async getOrders(req,res){
    try{
      if(!req.cookies.coderCookie){
        return res.redirect('/login')
      }
      else{
        const cid=jwt.verify(req.cookies.coderCookie,JWT_SECRET).cart
        // const result=await this.service.getCart(cid)
        const result=await OrderService.getCart(cid)
        return res.render('cart',{
          title:'cart',
          cart:result.payload.products
        })
      }
    }
    catch(error){
      console.log(error)
      return null
    }
  }
  async getOrderById(req,res){
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
        // const data=await this.service.getOrders(query,options);
        const data=await OrderService.getOrders(query,options);
        const user=jwt.verify(req.cookies.coderCookie,JWT_SECRET)
        return res.render('cart', {
          title: 'cart',
          products: data.docs,
          user:user,
          currentPage:data.page,
          totalPages:data.totalPages,
          hasPrevPage:data.prevLink,
          hasNextPage:data.nextLink,
          prevLink:data.prevPage?`http://localhost:8080/cart?page=${data.prevPage}`:null,
          nextLink:data.nextPage?`http://localhost:8080/cart?page=${data.nextPage}`:null
        });
    }
    catch(error){
      console.log(error)
      return null
    }

  }
  async addOrder(req,res){
    try{
      const cid=jwt.verify(req.cookies.coderCookie,JWT_SECRET).cart
      const {pid,qty}=req.body
      // // const response=await this.service.addProduct(cid,pid,qty)
      const response=await OrderService.addOrder(cid,pid,qty)
      return res.send({status:response.status,payload:response.payload})
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async updateOrder(req,res){
      const id = req.params.pid;
      const {title,description,code,price,status,stock,category}=req.body
      // const response=await this.service.updateProduct(id,title,description,code,price,status,stock,category)
      const response=await OrderService.updateProduct(id,title,description,code,price,status,stock,category)
      return res.send({status:response.status,payload:response.payload})
    }
  
  async deleteOrder(req,res){
      try{
        // const response=await this.service.deleteProduct(req.params.pid)
        const response=await OrderService.deleteProduct(req.params.pid)
        return {status:response.status,result:response.result,payload:response.payload}
      }
      catch(error){
        console.log(error)
        return null
      }
    }
}