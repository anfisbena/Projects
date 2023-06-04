import dao from '../dao/dbSelector.js'

class OrderRepository{
  constructor(dao){
    this.dao=dao.cart;
  }
  
  async getCart(cid){
    try{
      const cart=await this.dao.getCart(cid);
      return cart
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async addOrder(cid,pid,qty){
    try{
      console.log(cid,pid,qty,"REPOSITORY")
      const Order=await this.dao.addOrder(title,description,code,price,status,stock,category);
      return Order
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async updateOrder(id,title,description,code,price,status,stock,category){
    try{
      const Order=await this.dao.updateOrder(id,title,description,code,price,status,stock,category);
      return Order
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async deleteOrder(id){
    try{
      const Order=await this.dao.deleteOrder(id);
      return Order
    }
    catch(error){
      console.log(error)
      return null
    }
  }
}

const OrderRepo=new OrderRepository(dao);
export default OrderRepo;