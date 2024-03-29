//quede en 59:06
import express from 'express';
import {config} from './config/config.js';
import { engine } from 'express-handlebars';
import cookieParser from "cookie-parser";
import passport from "passport";
import morgan from 'morgan';
import socket from './socket.js'

import { __dirname } from './utils.js';
import initalizePassport from './auth/passport.js';
import Routes from './routes/index.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const {port}=config
const app=express();
const httpServer=app.listen(port,()=>{console.log('escuchando en '+port)})

const swaggerOptions={
  swaggerDefinition:{
    openapi:'3.0.1',
    info:{
      title:'API',
      description:'API information',
    }
  },
  apis:[`${__dirname}/docs/**/*.yaml`]
}
const swaggerDocs=swaggerJSDoc(swaggerOptions);
app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerDocs));

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
socket.connect(httpServer);