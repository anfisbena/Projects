import {UserDAO} from "../dao/mongodb/index.js";
import chai from 'chai';
import {hash,validatePassword} from '../utils.js'
import { get } from "mongoose";

const expect=chai.expect;

describe("password test",()=>{
  let originalPassword='alejo2000';
  let user;
  before(async()=>{
    const result=await UserDAO.getUser('arcilacarmona@gmail.com');//importo la data del modelo DAO hecho anteriormente)
    user=result;
  })

  it("password debe ser encriptado",async()=>{
    expect(user.password).to.not.be.equal(originalPassword)
  })
  it("password debe ser validado",async()=>{
    expect(validatePassword(user,{password:originalPassword})).to.be.equal(true)
  })
})