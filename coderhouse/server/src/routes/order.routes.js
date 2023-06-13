import { Router } from "express";
import {OrderController} from "../controllers/index.js";

const router = Router();

router.get('/purchase',OrderController.getOrders);
router.get('/:oid',OrderController.getOrderById);
router.post('/',OrderController.addOrder);
router.post('/checkout',OrderController.checkout)
router.put('/:oid',OrderController.updateOrder);
router.delete('/:oid',OrderController.deleteOrder);

export default class Order {
  constructor(mongooseConection,Order){
    mongooseConection
    this.order=Order
  }

  async getOrder(cid){
    try{
      const result=await this.order.findById(cid).populate('products.pid').lean()
      return {status:200,result:'ok',payload:result}
    }
    catch(error){
      console.log(error);
      return {status:500,result:'error',payload:'internal error'};
    }
  }

  async createOrder(userId){
    try{
      const result=await this.order.create({uid:userId});
      return {status:200,result:'ok',payload:result}
    }
    catch(error){
      console.log(error);
    }
  }
  
  async addOrder(cid,pid,qty){
    try{
      const order=await this.order.findById(cid).lean()
      const existingProduct = order.products.find(product => product.pid.toString() === pid);
      if (!existingProduct) {
        order.products.push({ pid:pid, quantity:parseInt(qty) });
      } else {
        existingProduct.quantity += parseInt(qty);
      }
      await this.order.findByIdAndUpdate(cid, order).lean()
      return {status:200,payload:'producto añadido al carrito'}
    }
    catch(error){
      console.log(error);
      return {status:500,result:'error',payload:'internal error'};
    }
  }
  async deleteOrder(cid,pid){
    try{
      const   order=await this.order.findById(cid).lean()
      order.products.splice(order.products.findIndex(product=>product.pid.toString()===pid),1);
      await this.order.findByIdAndUpdate(cid,order).lean()
      return {status:200}
    }
    catch(error){
      console.log(error);
      return {status:500,result:'error',payload:'internal error'};
    }
  }
}