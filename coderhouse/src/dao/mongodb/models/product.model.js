import {Schema,model} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new Schema(
    {
        title: {
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        code: {
            type: String,
            unique: true,
            index: true,
            required:true
        },
        price: {
            type:Number,
            required:true
        },
        status: {
            type:Boolean,
            default:true,
            required:true
        },
        stock: {
            type:Number,
            required:true
        },
        category:{
            type:String,
            enum:['Novartis','Viatris','Merck','Pfizer','AbbVie','Moderna','Roche','GMK','J&J'],
        },
        thumbnails: {
        type:Array,
        defaul:[]
        }
    }
);

ProductSchema.pre('save', function (next) {
    this.updatedAt=Date.now();
    next()
})

ProductSchema.plugin(mongoosePaginate)
const Product = model('products', ProductSchema);

export default Product;