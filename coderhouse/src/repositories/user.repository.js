import {dao} from '../dao/dbSelector.js'

class UserRepository{
  constructor(dao){
    this.dao=dao;
  }
  async getUser(email){
    const user=await this.dao.getUser(email);
    return user;
  }
}
const userRepo=new UserRepository(dao);
export default userRepo;  