import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import {COOKIE,JWT_SECRET} from "../config/config.js";

class UserController{
  constructor(){}
  
  async loginScreen(req,res){
    try{
      if(!req.cookies.coderCookie){
        return res.render('login',{
          title:'Login',
        })
      }
      else{
        return res.redirect('/')
      }
    }
    catch(err){console.log(err)}
  }

  async registerScreen(req, res){
    try{
      if(!req.cookies.coderCookie){
        return res.render('register',{
          title:'Register',
        })}
      else{
        return res.redirect('/profile')
      }
    }
    catch(err){console.log(err)}
  }

  async login(req,res){
    try{
      const  {email,password}=req.body
      const user=await userService.validateUser(email,password)
      if(user.status!==200){
        return res.send({status:user.status,error:user.error})
      }

      else{
        const userData={
          first_name:user.payload.first_name,
          last_name:user.payload.last_name,
          email:user.payload.email,
          role:user.payload.role
        }
        const jsonWebToken=jwt.sign(
          userData,
          process.env.JWT_SECRET,
          {expiresIn:'1d'}
        )

        return res
        .cookie(COOKIE,jsonWebToken,{httpOnly:true})
        .send({status:200,message:'User logged in'})
      }
    }
    catch(err){console.log(err)}
  }
  
  async register(req,res){//falta configurar el register
    try{
      const userExist=await Users.findOne({email:user.email}).lean()
      const error=ErrorCreateUser(user.first_name,user.last_name,user.email,userExist)
      if(error){
        return {status:error.status,result:error.result,error:error.error}}
      else{
        const newUser=
        {
          first_name:user.first_name,
          last_name:user.last_name,
          email:user.email,
          password:hash(user.password),
        };
        const userCreated = await Users.create(newUser);
        await createCart(userCreated._id)
        return {status:201,result:'ok',payload:'user created'};      
      }
    }
    catch(error){
      return {status:500,result:'error',payload:'error en servidor'}
    }
  }

  logout (req, res){
    try{
      res.clearCookie(process.env.COOKIE)
      return res.redirect('/login')
    }
    catch(err){console.log(err)}
  }

  async profile(req,res){
    try{
      if(!req.cookies.coderCookie){
        return res.redirect('/login')
      }
      else{
        const user=jwt.verify(req.cookies.coderCookie,JWT_SECRET)
        return res.render('profile',{
          title:'Profile',
          user:user
        })
      }
    }
    catch(err){console.log(err)}
  }
}

const userController=new UserController();
export default userController;