//quede en 
import express from 'express';
import {PORT} from './config/config.js';
import { engine } from 'express-handlebars';
import cookieParser from "cookie-parser";
import passport from "passport";
import morgan from 'morgan';
import nodemailer from 'nodemailer';

import { __dirname } from './utils.js';
import initalizePassport from './auth/passport.js';
import Routes from './routes/index.js';


const app=express();

app.listen(PORT,()=>{console.log('escuchando en '+PORT)})

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`)); //declaracion de folder public
app.engine('handlebars',engine());
app.set('views',`${__dirname}/views`)
app.set('view engine','handlebars')
app.use(morgan('dev'))
app.use(passport.initialize())
initalizePassport; //Carga la estrategia de autenticacion
Routes(app);
const transport=nodemailer.createTransport({
  service:'gmail',
  port:587,
  auth:{
    user:'arcilacarmona@gmail.com',
    pass:'byvghbkxkbxwsudk'
  }
})

app.get('/send-email',(req,res)=>{
  transport.sendMail({
    from:'Coder Test <arcilacarmona@gmail.com>',
    to:'<givemethecoin@gmail.com>',
    subject:'Correo de prueba',
    html:`
    <div>
      <h1>Prueba de correo</h1>
      <p>Te cague güachin</p>
    </div>
    `,
    attachments:[]
  })
  res.send('Correo enviado')
})