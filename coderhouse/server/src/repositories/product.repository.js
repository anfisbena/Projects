export default class ProductRepository{
  constructor(dao){
    this.dao=dao.ProductDAO;
  }
  
  async getProducts(query,options){
    const products=await this.dao.getProducts(query,options);
    return products
  }

  async getProductById(id){
    try{
      const product=await this.dao.getProductById(id);
      return product
    }
    catch(error){
      console.log(error)
      return null
    }
  }


  async addProduct(title,description,code,price,status,stock,category){
    try{
      console.log(title,description,code,price,status,stock,category,"REPOSITORY")
      const product=await this.dao.addProduct(title,description,code,price,status,stock,category);
      return product
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async updateProduct(id,title,description,code,price,status,stock,category){
    try{
      const product=await this.dao.updateProduct(id,title,description,code,price,status,stock,category);
      return product
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async deleteProduct(id){
    try{
      const product=await this.dao.deleteProduct(id);
      return product
    }
    catch(error){
      console.log(error)
      return null
    }
  }
}