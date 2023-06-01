import {PERSISTANCE} from '../config/config.js';

export let dao;

switch (PERSISTANCE) {
  case "MONGO":
    const {mongo}=await import ('./mongodb/mongoDB.js')
    dao=mongo;
    break;

  }

  export default {dao};