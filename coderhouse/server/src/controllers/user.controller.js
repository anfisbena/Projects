import jwt from "jsonwebtoken";
import {config} from "../config/config.js";
import UserDTO from "../dao/dto/user.dto.js";
import passport from 'passport';
import {UserService} from "../services/index.js"
import nodemailer from 'nodemailer';

const {jwtconfig}=config

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
          jwtconfig.secret,
          {expiresIn:'1d'}
        )

        return res
        .cookie(jwtconfig.cookie,jsonWebToken,{httpOnly:true,maxAge:86400000})
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
      res.clearCookie(jwtconfig.cookie)
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
        const user=jwt.verify(req.cookies.coderCookie,jwtconfig.secret)
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
        jwtconfig.secret,
        {expiresIn:'1d'}
      )
      return res
      .cookie(jwtconfig.cookie,jsonWebToken,{httpOnly:true,maxAge:86400000})
      .redirect('/')
    }
  }

  async getRecover(req,res){
    if(req.cookies.coderCookie){
      return res.redirect('/')
    }
    else{
      return res.render('recover',{
        title:'Recover password',
        status:'recover'
      })
    }
  }
  async setRecover(req,res){
    try{
      const email=req.body.email
      const user=await UserService.validateUserEmail(email)
      const userInfo={
        email:user.payload.email,
        password:user.payload.password,
      }
      const userToken=jwt.sign(
        userInfo,
        jwtconfig.secret,
        {expiresIn:'1h'}
      )

      if(user.status===200){
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
          to:`<${email}>`,
          subject:'Recuperacion de contraseña',
          html:`
          <div>
            <h1>¿Se te olvido la contraseña?</h1>
            <p>Has pedido recuperar la contraseña, para continuar da click <a href='http://localhost:8080/recover/${userToken}'>AQUI!</a></p>
            <p>Si no fuiste tu, ignora este mensaje</p>
          </div>
          `,
          attachments:[]
        })
        return res.send({user})
      }
      else{
        return res.send({user})
      }
    }
    catch(err){console.log(err)}
  }
  async getNewPassword(req,res){
    try{
      const token=req.params.userToken
      const userInfo=jwt.verify(token,jwtconfig.secret)
      const currentTimestamp = Math.floor(Date.now() / 1000);
    if (userInfo.exp < currentTimestamp) {
      return res.render('newPassword', {
        title: 'New password',
        validKey:false
      });
    }
    else{
      return res.render('newPassword', {
        title: 'New password',
        validKey:true
      });
    }
  }
    catch(err){
      return res.render('newPassword', {
        title: 'New password',
        validKey:false
      });
    }
  }
  async setNewPassword(req,res){
    try{
      const newPassword=req.body.password
      const token=req.params.userToken
      const tokenInfo=jwt.verify(token,jwtconfig.secret)
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (tokenInfo.exp < currentTimestamp) {
        return res.render('newPassword', {
          title: 'New password',
          validKey:false
        });
      }
      else{
        const response=await UserService.updateUserPassword(tokenInfo.email,newPassword)
        return res.send({status:response.status,message:response.message})
      }
    }
    catch(err){console.log(err)}
  }
}