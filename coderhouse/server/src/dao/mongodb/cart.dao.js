export default class Cart {
  constructor(mongooseConection,Cart){
    mongooseConection
    this.cart=Cart
  }

  async getCart(id){
    try{
      const result=await this.cart.findById(id).populate('products').lean()
      return {status:200,result:'ok',payload:result}
    }
    catch(error){
      console.log(error);
      return {status:500,result:'error',payload:'internal error'};
    }
  }

  async addOrder(cid,pid,qty){
    try{
      const cart=await this.cart.findById(cid).lean()
      const existingProduct = cart.products.find(product => product.pid.toString() === pid);
      if (!existingProduct) {
        cart.products.push({ pid:pid, quantity:qty });
      } else {
        parseInt(existingProduct.quantity) += parseInt(qty);
      }
      await this.cart.findByIdAndUpdate(cid, cart).lean()
      return {status:200,payload:'producto añadido al carrito'}
    }
    catch(error){
      console.log(error);
      return {status:500,result:'error',payload:'internal error'};
    }
  }

  async createCart(userId){
    try{
      const result=await this.cart.create({uid:userId});
      return {status:200,result:'ok',payload:result}
    }
    catch(error){
      console.log(error);
    }
  }
}