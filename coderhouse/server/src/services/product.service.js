import ProductRepository from "../repositories/product.repository.js";

class ProductService{
  constructor(){}
  
  async getProducts(query,options){
    const result=await ProductRepository.getProducts(query,options)
    return result
  }

  async addProduct(title,description,code,price,status,stock,category){
    try{
      const result=await ProductRepository.addProduct(title,description,code,price,status,stock,category)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async updateProduct(id,title,description,code,price,status,stock,category){
    try{
      const result=await ProductRepository.updateProduct(id,title,description,code,price,status,stock,category)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async deleteProduct(id){
    try{
      const result=await ProductRepository.deleteProduct(id)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }
}

const productService=new ProductService();
export default productService;