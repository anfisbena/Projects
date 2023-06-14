export default class Product {
  constructor(mongooseConection,Product){
    mongooseConection
    this.product=Product
  }

  getProducts(query,options){
    return this.product.paginate(query,options);
  }

  async getProductById(id){
    try{
      const result =await this.product.findById(id).lean()
      return [result]
    }
    catch (error){
      console.log(error)
      return []
    }
  }
  
  addProduct(title,description,code,price,status,stock,category){
    try{
      this.product.create(
        {
          title:title,
          description:description,
          code:code,
          price:price,
          status:status,
          stock:stock,
          category:category,
          thumbnails:"https://picsum.photos/200/300"
        }
      );
      return {status:200,result:'ok',payload:'producto agregado'}
    }
    catch(error){
      console.log(error)
      return {status:500,result:'error',payload:'error interno'}
    }
  }
  
  async updateProduct(id,title,description,code,price,status,stock,category){
      try{
        const query ={_id:id}
        const oldProduct=await this.getProductById(id)
        const updatedProduct={
          title: title??oldProduct[0].title,
          description: description??oldProduct[0].description,
          code: code??oldProduct[0].code,
          price: price??oldProduct[0].price,
          status: status??oldProduct[0].status,
          stock: stock??oldProduct[0].stock,
          category:category??oldProduct[0].category,
          thumbnails:oldProduct[0].thumbnails
        }
        const caca=await this.product.findByIdAndUpdate(query,updatedProduct)

        return {status:200,result:'ok',payload:'producto actualizado'}  
      }
      catch (error){
      return {status:400,result:'error',payload:'producto no encontrado'}
      }
    }
  
  async deleteProduct(id){
    try{
      await this.product.deleteOne({_id:id})
      return {status:200,result:'ok',payload:'producto eliminado'}
    }
    catch(error){
      return {status:400,result:'error',payload:'producto no encontrado'}
    } 
  }

  async updateStock(id,quantity){
    try{
      await this.product.findByIdAndUpdate(id,{stock:quantity})
      return {status:200,result:'ok',payload:'stock actualizado'}
    }
    catch(error){
      return {status:400,result:'error',payload:'producto no encontrado'}
    }
  }
}