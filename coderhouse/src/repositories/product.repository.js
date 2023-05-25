import {dao} from '../dao/dbSelector.js'

class ProductRepository{
  constructor(dao){
    this.dao=dao;
  }
  
  async getProducts(query,options){
    const products=await this.dao.getProducts(query,options);
    return products
  }
}

const productRepo=new ProductRepository(dao);
export default productRepo;