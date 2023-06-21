import {Schema,model} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const ChatSchema= new Schema({
  uid:{
    type:Schema.Types.ObjectId,
    ref:"users",
    index:true
  },
  chat:[
    {
      uid:{
        type:Schema.Types.ObjectId,
        ref:"users",
        index:true
      },
      text:{
        type:String,
      },
      datetime:{
        type:Date,
        default:Date.now()
      }
    }
  ],
  closed:{
    type:Boolean,
  }
})

ChatSchema.plugin(mongoosePaginate)
const Chats = model("chat", ChatSchema);

export default Chats;