import dotenv from 'dotenv';

dotenv.config();

export const mongoDB=process.env.mongoDB;
export const PERSISTANCE=process.env.PERSISTANCE;
export const JWT_SECRET=process.env.JWT_SECRET;
export const COOKIE=process.env.COOKIE;
export const PORT=process.env.PORT;
export const GITHUB_CID=process.env.GITHUB_CID;
export const GITHUB_SECRET=process.env.GITHUB_SECRET;
export const GITHUB_URL=process.env.GITHUB_URL;


export default {mongoDB,PERSISTANCE,JWT_SECRET,COOKIE,PORT,GITHUB_CID,GITHUB_SECRET,GITHUB_URL} 