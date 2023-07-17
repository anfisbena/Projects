import {config} from '../config/config.js';

const {dbPicker}=config

export let dao;

switch (dbPicker) {
  case "MONGO":
    const mongo=await import  ('./mongodb/index.js')
    dao=mongo
    break;

  }

  export default dao;