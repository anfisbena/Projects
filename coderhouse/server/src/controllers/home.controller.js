import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/config.js";

export default class HomeController{
  constructor(){}
  
  async homeScreen(req,res){
    try{
      if(!req.cookies.coderCookie){
        return res.redirect('/login')
      }
      else{
        const user=jwt.verify(req.cookies.coderCookie,JWT_SECRET)
        return res.render('home',{
          user:user
        })
      }
    }
    catch(err){console.log(err)}
  }
}