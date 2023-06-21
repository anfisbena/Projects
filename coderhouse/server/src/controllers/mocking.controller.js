import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/config.js";
import {generateProduct,generateUser} from '../utils.js'

export default class MockingController{
  constructor(){}

  async getMockingData(req,res){
    try{
      const products=[];
      for(let i=0;i<50;i++){products.push(generateProduct())}
        const user=jwt.verify(req.cookies.coderCookie,JWT_SECRET)
        return res.render('products', {
          title: 'products',
          products: products,
          user:user
        });
    }
    catch(error){
      console.log(error)
      return null
    }
  }
}