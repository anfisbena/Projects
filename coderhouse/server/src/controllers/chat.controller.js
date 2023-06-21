export default class chatController{
  constructor(){
  }

  async getChat(req,res){
    try{
      return res.render('chat',{
        title:'chat'
      })
    }
    catch(error){
      console.log(error)
      return null
    }
  }
}