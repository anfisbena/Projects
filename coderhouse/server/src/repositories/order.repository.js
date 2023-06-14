export default class OrderRepository{
  constructor(dao){
    this.dao=dao.OrderDAO;
  }
  
  async getOrder(cid){
    try{
      const cart=await this.dao.getOrders(cid);
      return cart
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async addOrder(amount,purchaser,products){
    try{
      const Order=await this.dao.addOrder(amount,purchaser,products);
      return Order
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async deleteOrder(cid,pid){//no testeado
    try{
      const Order=await this.dao.deleteOrder(cid,pid);
      return Order
    }
    catch(error){
      console.log(error)
      return null
    }
  }
}