export default class Order {
  constructor(mongooseConection,Order){
    mongooseConection
    this.order=Order
  }
  async getOrders(query,options){
    return await this.order.paginate(query,options);
  }

  async getOrderById(id){
    try{
      const result =await this.order.findById(id).lean()
      return [result]
    }
    catch (error){
      console.log(error)
      return []
    }
  }

  async addOrder(amount,purchaser,products){
    try{
      const newOrder=new this.order({
        code:this.makeid(10),
        amount:amount,
        amount,
        purchaser:purchaser,
        products:products
      })
      const RepeatedId=await this.order.findOne({code:newOrder.code})
      while (RepeatedId){
        newOrder.code=this.makeid(10)
      }
      const result=await this.order.create(newOrder)
      return {status:200,result:'ok',payload:result}
    }
    catch (error){
      console.log(error)
      return {status:500,result:'error',payload:'error interno'}
    }
  }

  makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
}