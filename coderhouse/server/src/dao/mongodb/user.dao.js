import {hash} from '../../utils.js'


export default class User {
  constructor(mongooseConection,UserModel,CartDAO){
    mongooseConection
    this.user=UserModel
    this.cart=CartDAO
  }

  async getUser(email){
    try{
      return await this.user.findOne({email:email}).lean();
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  async addUser(user){
    try{
      const userExist=await this.user.findOne({email:user.email}).lean()
      if(userExist){
      return {status:400,result:'error',payload:'user already exists'}
      }
      else{
        const newUser=
        {
          first_name:user.first_name,
          last_name:user.last_name,
          email:user.email,
          password:hash(user.password),
          role:user.role,
        };
        const userCreated=await this.user.create(newUser)
        const cartCreated=await this.cart.createCart(userCreated._id)
        await this.user.findByIdAndUpdate(userCreated._id,{cart:cartCreated.payload._id})
        
        return {status:201,result:'ok',payload:'user created'}
      }
    }
    catch(error){
      console.log(error)
      return {status:500,result:'error',payload:'internal error'}
    }
  }

  async validateUserEmail(email){
    try{
      const userExist=await this.user.findOne({email:email}).lean()
      if(userExist){
        return {status:200,result:'ok',payload:userExist}
      }
      else{
        return {status:400,result:'error',payload:'user does not exist'}
      }
    }
    catch(error){
      console.log(error)
      return {status:500,result:'error',payload:'internal error'}
    }
  }

  async updateUserPassword(email,password){
    try{
      const userExist=await this.user.findOne({email:email}).lean()
      if(userExist){
        const newPassword=hash(password)
        await this.user.findByIdAndUpdate(userExist._id,{password:newPassword})
        return {status:200,result:'ok',message:'Contraseña Cambiada Exitosamente'}
      }
    }
    catch(error){
      console.log(error)
      return {status:500,result:'error',message:'internal error'}
    }
  }
}