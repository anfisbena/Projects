export default class OrderRepository{
  constructor(dao){
    this.dao=dao.CartDAO;
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

  async addOrder(cid,pid,qty){//no testeado
    try{
      const Order=await this.dao.addOrder(cid,pid,qty);
      return Order
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async updateOrder(id,title,description,code,price,status,stock,category){//no testeado
    try{
      const Order=await this.dao.updateOrder(id,title,description,code,price,status,stock,category);
      return Order
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async deleteOrder(id){//no testeado
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