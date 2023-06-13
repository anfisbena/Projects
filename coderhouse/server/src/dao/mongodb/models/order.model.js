import {Schema,model} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const TicketSchema= new Schema({
  code: { type: String, unique: true, required: true },
  purchase_datetime: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  products:[
    {
      pid:{
        type:Schema.Types.ObjectId,
        ref:"products"
      }
      ,quantity:{
        type:Number,
        default:1
      }
    }
  ]
})

TicketSchema.plugin(mongoosePaginate)
const Tickets = model("order", CartSchema);

export default Tickets;