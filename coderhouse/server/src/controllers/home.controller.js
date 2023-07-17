import jwt from "jsonwebtoken";
import {config} from "../config/config.js";

const {jwtconfig}=config

export default class HomeController{
  constructor(){}
  
  async homeScreen(req,res){
    try{
      if(!req.cookies.coderCookie){
        return res.redirect('/login')
      }
      else{
        const user=jwt.verify(req.cookies.coderCookie,jwtconfig.secret)
        return res.render('home',{
          user:user
        })
      }
    }
    catch(err){console.log(err)}
  }
}