import ProductRepository from "../repositories/product.repository.js";

class ProductService{
  constructor(){}
  
  async getProducts(query,options){
    const result=await ProductRepository.getProducts(query,options)
    return result
  }
}

const productService=new ProductService();
export default productService;