//quede en 38:14
import express from 'express';
import {PORT} from './config/config.js';
import { engine } from 'express-handlebars';
import cookieParser from "cookie-parser";
import passport from "passport";
import morgan from 'morgan';

import { __dirname } from './utils.js';
import initalizePassport from './auth/passport.js';
import Routes from './routes/index.js';


const app=express();

app.listen(PORT,()=>{console.log('escuchando en '+PORT)})

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize())
initalizePassport; //Carga la estrategia de autenticacion
app.use(express.static(`${__dirname}/public`)); //declaracion de folder public
app.engine('handlebars',engine());
app.set('views',`${__dirname}/views`)
app.set('view engine','handlebars')
app.use(morgan('dev'))
Routes(app);