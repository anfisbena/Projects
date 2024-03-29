import jwt from "jsonwebtoken";
import {config} from "../config/config.js";

const {jwtconfig}=config
export const cartRigths= async(req, res, next) => {
  try{
    if(!req.cookies.coderCookie){
      return res.redirect('/login')
    }
    else{
      const role=jwt.verify(req.cookies.coderCookie,jwtconfig.secret).role
      if(role==='user'){
        next()
      }
      else{
        res.render('401',{
          title:'No autorizado',
          message:`tu perfil actual de ${user} no tiene permisos para acceder a esta pagina`
        })
      }
    }
  }
  catch(error){
    console.log(error)
    return null
  } 
}

export const productRights= async(req, res, next) => {
  try{
    if(!req.cookies.coderCookie){
      return res.redirect('/login')
    }
    else{
      const role=jwt.verify(req.cookies.coderCookie,jwtconfig.secret).role
      if(role==='admin'){
        next()
      }
      else{
        res.render('401',{
          title:'No autorizado',
          message:`tu perfil actual de ${user} no tiene permisos para acceder a esta pagina`
        })
      }
    }
  }
  catch(error){
    console.log(error)
    return null
  }
}

export const chatRights= async(req, res, next) => {
  try{
    if(!req.cookies.coderCookie){
      return res.redirect('/login')
    }
    else{
      const role=jwt.verify(req.cookies.coderCookie,jwtconfig.secret).role
      if(role==='user'){
        next()
      }
      else{
        res.render('401',{
          title:'No autorizado',
          message:`tu perfil actual de ${user} no tiene permisos para acceder a esta pagina`
        })
      }
    }
  }
  catch(error){
    console.log(error)
    return null
  }
}


export default {cartRigths,productRights,chatRights}