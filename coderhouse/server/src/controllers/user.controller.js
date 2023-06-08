import jwt from "jsonwebtoken";
import {COOKIE,JWT_SECRET} from "../config/config.js";
import UserDTO from "../dao/dto/user.dto.js";
import passport from 'passport';
import {UserService} from "../services/index.js"
import nodemailer from 'nodemailer';

export default class UserController{
  constructor(service){
    this.service=service
  }
  
  async getLogin(req,res){
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
  async setLogin(req,res){
    try{
      const  credentials=new UserDTO(req.body)
      // const user=await this.service.getUser(credentials)
      const user=await UserService.getUser(credentials)
      if(user.status!==200){
        return res.send({status:user.status,error:user.error})
      }
      else{
        const userData={
          first_name:user.payload.first_name,
          last_name:user.payload.last_name,
          email:user.payload.email,
          role:user.payload.role,
          cart:user.payload.cart
        }
        const jsonWebToken=jwt.sign(
          userData,
          process.env.JWT_SECRET,
          {expiresIn:'1d'}
        )

        return res
        .cookie(COOKIE,jsonWebToken,{httpOnly:true,maxAge:86400000})
        .send({status:200,message:'User logged in'})
      }
    }
    catch(err){console.log(err)}
  }
  

  async getRegister(req, res){
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
  async setRegister(req,res){
    try{
      const user=new UserDTO(req.body)
      // const result=await this.service.addUser(user)
      const result=await UserService.addUser(user)
      const transport=nodemailer.createTransport({
        service:'gmail',
        port:587,
        auth:{
          user:'arcilacarmona@gmail.com',
          pass:'byvghbkxkbxwsudk'
        }
      })

      transport.sendMail({
        from:'no-response <no-response@e-commerce.com>',
        to:`<${user.email}>`,
        subject:'Bienvenido a E-commerce',
        html:`
        <div>
          <h1>Te acabas de unir a la tienda mas chimba!</h1>
          <p>Medellin style y mucho mas</p>
        </div>
        `,
        attachments:[]
      })
      return res.send({status:result.status,payload:result.payload})
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  getLogout (req, res){
    try{
      res.clearCookie(process.env.COOKIE)
      return res.redirect('/login')
    }
    catch(err){console.log(err)}
  }

  async getProfile(req,res){
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

  async githubAuthenticate(){
    await passport.authenticate('githubAuth',{scope:['user:email']}),(req,res)=>{}
  }

  async githubSuccess(){
    passport.authenticate('githubAuth',{failureRedirect:'/login'}),async (req,res)=>{
      delete req.user.password
      req.session.user=req.user;
      const jsonWebToken=jwt.sign(
        req.session.user,
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
      )
      return res
      .cookie(COOKIE,jsonWebToken,{httpOnly:true,maxAge:86400000})
      .redirect('/')
    }
  }
}