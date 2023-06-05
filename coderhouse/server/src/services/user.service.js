export default class UserService{
  constructor(repository,passwordValidator){
    this.repository=repository
    this.passwordValidator=passwordValidator
  }
  
  async getUser(credentials){
    try{
      const user=await this.repository.getUser(credentials)
      if(!user){
        return {status:401,error:'User not found'}
      }
      if(!this.passwordValidator(user,credentials)){
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
      const result=await this.repository.addUser(user)
      return result
    }
    catch(err){
      console.log(err)
      return null
    }
  }

}