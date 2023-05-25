import UserRepository from "../repositories/user.repository.js";
import { validatePassword } from "../utils.js";

class UserService{
  constructor(){}
  
  async validateUser(email,password){
    try{
      const user=await UserRepository.getUser(email)
      if(!user){
        return {status:401,error:'User not found'}
      }
      if(!validatePassword(user,password)){
        return {status:401,error:'Incorrect password'}
      }
      else{
        return {status:200,payload:user}
      }
    }
    catch(err){console.log(err)}
  }

}

const userService=new UserService();
export default userService;