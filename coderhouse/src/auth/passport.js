import passport from "passport";
import jwt from 'passport-jwt'; //afterclass 11/05
import {JWT_SECRET} from '../config/config.js';
import {cookieExtractor} from './passportTools.js'

const jwtStrategy=jwt.Strategy;


export const initializePassport=()=>{
  const jwtOptions={
    jwtFromRequest:jwt.ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey:JWT_SECRET,
  }
  const jwtPayload=async (jwtPayload,done)=>{
    try{
      return done(null,jwtPayload)
    }
    catch(error){
      return done(error)
    }
  }

  passport.use('jwt',new jwtStrategy(jwtOptions,jwtPayload))
}

export default initializePassport();