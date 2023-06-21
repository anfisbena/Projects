import {dirname} from 'path';
import { fileURLToPath } from 'url';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import {faker} from "@faker-js/faker/locale/es"

export const __dirname= dirname(fileURLToPath(import.meta.url));

export const hash = (password) => hashSync(password, genSaltSync(10)); // Hashea 10 saltos
export const validatePassword =(user, credentials) =>compareSync(credentials.password, user.password);// Compara el password con el hash

export const generateProduct=()=>{
  return{
    id:faker.database.mongodbObjectId(),
    title:faker.commerce.productName(),
    description:faker.commerce.productDescription(),
    code:faker.string.alphanumeric(5),
    price:faker.commerce.price({ min: 100, max: 200, dec: 0 }),
    status:true,
    stock:faker.number.int({min:1,max:100}),
    category:'GMK',
    thumbnails:faker.image.url({height:200,width:300}),
    }
}

export const generateUser=()=>{
  let randomNumber=faker.number.int(20);
  let cart=[];
  for(let i=0;i<randomNumber;i++){cart.push(generateProduct());}
  return{
    id:faker.database.mongodbObjectId(),
    name:faker.person.firstName(),
    lastname:faker.person.lastName(),
    email:faker.internet.email(),
    password:hash(faker.internet.password()),
    role:'user',
    cart:cart
    }
}

export default {__dirname,hash,validatePassword,generateProduct,generateUser};