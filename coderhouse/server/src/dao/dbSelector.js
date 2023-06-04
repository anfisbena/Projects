import {PERSISTANCE} from '../config/config.js';

export let dao;

switch (PERSISTANCE) {
  case "MONGO":
    const mongo=await import  ('./mongodb/index.js')
    dao=mongo
    break;

  }

  export default dao;