export default class UserDTO{
  constructor(contact){
    this.email=contact.email;
    this.password=contact.password;
    this.first_name=contact.first_name;
    this.last_name=contact.last_name;
    this.role=contact.role||'user';
  }
};
