export default class OrderService{
  constructor(repository){
    this.repository=repository
  }
  
  async getOrder(cid){
    try{
      const result=await this.repository.getOrders(cid)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async addOrder(amount,purchaser,products){

    try{
      const result=await this.repository.addOrder(amount,purchaser,products)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }
}