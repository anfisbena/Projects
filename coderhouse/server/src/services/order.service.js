import OrderRepository from "../repositories/order.repository.js";

class OrderService{
  constructor(){}
  
  async getCart(cid){
    try{
      const result=await OrderRepository.getCart(cid)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async addOrder(title,description,code,price,status,stock,category){
    try{
      const result=await OrderRepository.addOrder(title,description,code,price,status,stock,category)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async updateOrder(id,title,description,code,price,status,stock,category){
    try{
      const result=await OrderRepository.updateOrder(id,title,description,code,price,status,stock,category)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async deleteOrder(id){
    try{
      const result=await OrderRepository.deleteOrder(id)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }
}

const orderService=new OrderService();
export default orderService;