//quede en 31:47
import Express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.router.js'


dotenv.config();
const PORT=process.env.PORT||8080;
const USER=process.env.USER;
const PASS=process.env.PASS;
const userRouter=new UserRouter();

const app=Express();
app.use(Express.json());
app.use('/',userRouter.getRouter());

app.listen(PORT,()=>{console.log('escuchando en '+PORT)})
mongoose.connect(`mongodb+srv://${USER}:${PASS}@cluster0.bsrdbik.mongodb.net/tempdb?retryWrites=true&w=majority`)