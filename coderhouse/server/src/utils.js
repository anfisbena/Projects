import {dirname} from 'path';
import { fileURLToPath } from 'url';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';

export const __dirname= dirname(fileURLToPath(import.meta.url));

export const hash = (password) => hashSync(password, genSaltSync(10)); // Hashea 10 saltos
export const validatePassword =(user, credentials) =>compareSync(credentials.password, user.password);// Compara el password con el hash

export default {__dirname,hash,validatePassword};