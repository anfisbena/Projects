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
};  