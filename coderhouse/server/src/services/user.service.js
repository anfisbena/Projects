import UserRepository from "../repositories/user.repository.js";
import { validatePassword } from "../utils.js";

class UserService{
  constructor(){}
  
  async validateUser(credentials){
    try{
      const user=await UserRepository.getUser(credentials)
      if(!user){
        return {status:401,error:'User not found'}
      }
      if(!validatePassword(user,credentials)){
        return {status:401,error:'Incorrect password'}
      }
      else{
        return {status:200,payload:user}
      }
    }
    catch(err){console.log(err)}
  }

  async addUser(user){
    try{
      const result=await UserRepository.addUser(user)
      return result
    }
    catch(err){
      console.log(err)
      return null
    }
  }

}

const userService=new UserService();
export default userService;