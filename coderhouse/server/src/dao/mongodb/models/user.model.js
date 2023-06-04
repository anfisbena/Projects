import {Schema,model} from 'mongoose';

const UserSchema = new Schema(
    {
        first_name:
        {
            type:String,
            required:true
        },
        last_name:
        {
            type:String,
        },
        email: 
        {
            type: String,
            unique: true,
            index:true
        },
        password:{
            type:String,
        },
        role:
        {
            type:String,
            enum:['admin','user'],
            default:'user'
        },
        cart:{
            type:Schema.Types.ObjectId,
            ref:'carts'
        }
    }
);

const User = model('users', UserSchema);
export default User;