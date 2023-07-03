export default class UserRepository{
  constructor(dao){
    this.dao=dao.UserDAO;
  }
  async getUser(credentials){
    try{
      const user=await this.dao.getUser(credentials.email);
      return user;
    }
    catch(err){
      console.log(err);
      return null;
    }
  }
  async addUser(user){
    try{
      const result=await this.dao.addUser(user)
      return result
    }
    catch(err){
      console.log(err)
      return null
    }
  }
  async validateUserEmail(email){
    try{
      const result=await this.dao.validateUserEmail(email)
      return result
    }
    catch(err){
      console.log(err)
      return null
    }
  }
  async updateUserPassword(email,password){
    try{
      const result=await this.dao.updateUserPassword(email,password)
      return result
    }
    catch(err){
      console.log(err)
      return null
    }
  }
};  