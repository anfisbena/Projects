import {Schema,model} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const CartSchema= new Schema({
  uid:{
    type:Schema.Types.ObjectId,
    ref:"users",
    index:true
  },
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

CartSchema.plugin(mongoosePaginate)
const Carts = model("carts", CartSchema);

export default Carts;