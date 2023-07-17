import passport from "passport";
import github from "passport-github2";
import jwt from 'passport-jwt'; //afterclass 11/05
import {config} from '../config/config.js';
import {cookieExtractor} from './passportTools.js'
import User from "../dao/mongodb/models/user.model.js";

const jwtStrategy=jwt.Strategy;
const GitHubStrategy=github.Strategy;

const{jwtconfig,githubConfig}=config

export const initializePassport=()=>{
  const jwtOptions={
    jwtFromRequest:jwt.ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey:jwtconfig.secret,
  }
  const jwtPayload=async (jwtPayload,done)=>{
    try{
      return done(null,jwtPayload)
    }
    catch(error){
      return done(error)
    }
  }

  passport.use('githubAuth',new GitHubStrategy({
    clientID:githubConfig.cid,
    clientSecret:githubConfig.secret,
    callbackURL:githubConfig.url,
    },
    async(accessToken,refreshToken,profile,done)=>{
      try{
        let user =await User.findOne({email:profile._json.email})
        if(!user){
          const newUser={
            first_name:profile._json.name??profile._json.login,
            last_name:'',
            email:profile._json.email,
            role:'user',
            password:''
          }
          let user=await User.create(newUser)
          await Carts.create({uid:user._id});
          return done(null,user)
        }
        else{
          return done(null,user)
        }
      }
      catch(err){
        done(err)
      }
    }
  ))
  passport.use('jwt',new jwtStrategy(jwtOptions,jwtPayload))
}

export default initializePassport();