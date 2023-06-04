import dao from '../dao/dbSelector.js'

class UserRepository{
  constructor(dao){
    this.dao=dao.user;
  }
  async getUser(credentials){
    const user=await this.dao.getUser(credentials.email);
    return user;
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
}

const userRepo=new UserRepository(dao);
export default userRepo;  