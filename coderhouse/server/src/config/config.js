import dotenv from 'dotenv';

dotenv.config();

export const config={
  port:process.env.PORT,
  dbPicker:process.env.PERSISTANCE,
  mongo:{
    url:process.env.mongoDB,
  },
  jwtconfig:{
    cookie:process.env.COOKIE,
    secret:process.env.JWT_SECRET,
  },
  githubConfig:{
    cid:process.env.GITHUB_CID,
    secret:process.env.GITHUB_SECRET,
    url:process.env.GITHUB_URL,
  },
  nodeMailerConfig:{
    service:process.env.NODEMAILER_SERVICE,
    port:process.env.NODEMAILER_PORT,
    email:process.env.GOOGLE_MAIL,
    key:process.env.GOOGLE_PASS,
  }
}

// export const mongoDB=process.env.mongoDB;
// export const PERSISTANCE=process.env.PERSISTANCE;
// export const JWT_SECRET=process.env.JWT_SECRET;
// export const COOKIE=process.env.COOKIE;
// export const PORT=process.env.PORT;
// export const GITHUB_CID=process.env.GITHUB_CID;
// export const GITHUB_SECRET=process.env.GITHUB_SECRET;
// export const GITHUB_URL=process.env.GITHUB_URL;


export default {config} 