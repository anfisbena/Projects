import dotenv from 'dotenv';

dotenv.config();

export const mongoDB=process.env.mongoDB;
export const PERSISTANCE=process.env.PERSISTANCE;
export const JWT_SECRET=process.env.JWT_SECRET;
export const COOKIE=process.env.COOKIE;
export const PORT=process.env.PORT;

export default {mongoDB,PERSISTANCE,JWT_SECRET,COOKIE,PORT} 