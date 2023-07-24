import {UserDAO} from "../dao/mongodb/index.js";
import chai from 'chai';
const expect=chai.expect;

describe("User test",()=>{
  before(async()=>{/*Se invocan los metodos antes de la prueba*/})
  beforeEach(async()=>{/*Se invocan los metodos antes de cada prueba*/})
  it("DAO debe obtener los usuarios en objeto",async()=>{
    //Se hace test
    const result=await UserDAO.getUser('arcilacarmona@gmail.com');//importo la data del modelo DAO hecho anteriormente
    expect(typeof(result)).to.be.deep.equal('object','object','No es objeto')//hago la prueba
  })
})