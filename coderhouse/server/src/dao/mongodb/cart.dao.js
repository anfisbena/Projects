export default class Cart {
  constructor(mongooseConection,Cart){
    mongooseConection
    this.cart=Cart
  }

  async getCart(cid){
    try{
      const result=await this.cart.findById(cid).populate('products.pid').lean()
      return {status:200,result:'ok',payload:result}
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
  
  async addOrder(cid,pid,qty){
    try{
      const cart=await this.cart.findById(cid).lean()
      const existingProduct = cart.products.find(product => product.pid.toString() === pid);
      if (!existingProduct) {
        cart.products.push({ pid:pid, quantity:parseInt(qty) });
      } else {
        existingProduct.quantity += parseInt(qty);
      }
      await this.cart.findByIdAndUpdate(cid, cart).lean()
      return {status:200,payload:'producto añadido al carrito'}
    }
    catch(error){
      console.log(error);
      return {status:500,result:'error',payload:'internal error'};
    }
  }
  async deleteOrder(cid,pid){
    try{
      const   cart=await this.cart.findById(cid).lean()
      cart.products.splice(cart.products.findIndex(product=>product.pid.toString()===pid),1);
      await this.cart.findByIdAndUpdate(cid,cart).lean()
      return {status:200}
    }
    catch(error){
      console.log(error);
      return {status:500,result:'error',payload:'internal error'};
    }
  }
}