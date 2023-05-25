import ProductService from "../services/product.service.js";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/config.js";

class ProductController{
  constructor(){}
  
  async getProducts(req,res){
    const query=req.query.query||{};
    const options=
      {
        lean:true,
        limit: parseInt(req.query.limit)||5,
        page: parseInt(req.query.page)||1,
        sort:req.query.sort?{price:req.query.sort}:{}
      };
      const data=await ProductService.getProducts(query,options);
      const user=jwt.verify(req.cookies.coderCookie,JWT_SECRET)
      return res.render('products', {
        title: 'products',
        products: data.docs,
        user:user,
        currentPage:data.page,
        totalPages:data.totalPages,
        hasPrevPage:data.prevLink,
        hasNextPage:data.nextLink,
        prevLink:data.prevPage?`http://localhost:8080/api/products?page=${data.prevPage}`:null,
        nextLink:data.nextPage?`http://localhost:8080/api/products?page=${data.nextPage}`:null
      });
  }
}

const productController=new ProductController();
export default productController;