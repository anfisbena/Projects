import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/config.js";
import {CartService} from "../services/index.js"

export default class CartController{
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
        const result=await CartService.getCart(cid)
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
        const data=await CartService.getOrders(query,options);
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
      const response=await CartService.addOrder(cid,pid,qty)
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
      const response=await CartService.updateProduct(id,title,description,code,price,status,stock,category)
      return res.send({status:response.status,payload:response.payload})
    }
  
  async deleteOrder(req,res){
      try{
        const cid=jwt.verify(req.cookies.coderCookie,JWT_SECRET).cart
        const pid=req.params.oid
        // const response=await this.service.deleteOrder(cid,pid)
        const response=await CartService.deleteOrder(cid,pid)
        return {status:response.status}
      }
      catch(error){
        console.log(error)
        return null
      }
    }
}