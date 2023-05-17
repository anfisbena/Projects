import CustomRouter from "./router.js";

export default class UsersRouter extends CustomRouter {
  init() {
    this.get("/", ["PUBLIC"], (req, res) => {
      res.sendSucess("Hola, coders");
    });
  }
}