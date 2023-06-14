export default class ProductService{
  constructor(repository){
    this.repository=repository
  }
  
  async getProducts(query,options){
    const result=await this.repository.getProducts(query,options)
    return result
  }

  async getProductById(id){
    try{
      const result=await this.repository.getProductById(id)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async addProduct(title,description,code,price,status,stock,category){
    try{
      const result=await this.repository.addProduct(title,description,code,price,status,stock,category)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async updateProduct(id,title,description,code,price,status,stock,category){
    try{
      const result=await this.repository.updateProduct(id,title,description,code,price,status,stock,category)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async deleteProduct(id){
    try{
      const result=await this.repository.deleteProduct(id)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }
  
  async updateStock(id,quantity){
    try{
      const result=await this.repository.updateStock(id,quantity)
      return result
    }
    catch(error){
      console.log(error)
      return null
    }
  }
}