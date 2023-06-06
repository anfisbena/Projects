export default class CartService{
  constructor(repository){
    this.repository=repository
  }
  
  async getCart(cid){
    try{
      const result=await this.repository.getCart(cid)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async addOrder(cid,pid,qty){
    try{
      const result=await this.repository.addOrder(cid,pid,qty)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async updateOrder(id,title,description,code,price,status,stock,category){
    try{
      const result=await this.repository.updateOrder(id,title,description,code,price,status,stock,category)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async deleteOrder(cid,pid){
    try{
      const result=await this.repository.deleteOrder(cid,pid)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }
}