import jwt from "jsonwebtoken";
import Services from "./Services.js";
import { ERROR_EMAIL, ERROR_PASSWORD } from "../store/consts/errors.js";

const generateJwt = (id, login, role = "writer") => {
  return jwt.sign({ id, login, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class Controller {
  async registration(req, res, next) {
    try {
      const { login, password, role } = req.body;
      if (!login || !password) return next(res.send("Не корректный пароль"));
      const { data } = await Services.getUsers();
      const candidate = data.some((user) => user.login === login);
      if (candidate) {
        return next(res.send("Пользователь с таким email уже существует"));
      }
      const user = await Services.createUser({
        login,
        password,
        role,
      });
      const jwtToken = generateJwt(data.length + 1, login, user.role);
      return res.json({ jwtToken });
    } catch (e) {
      console.log(e);
      res.status(400).json("Registration error");
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const { data } = await Services.findUser({
        login,
      });
      if (!data.length) {
        return next(res.status(203).send(ERROR_EMAIL));
      }
      if (+password !== +data[0].password) {
        return next(res.status(203).send(ERROR_PASSWORD));
      }
      const jwtToken = generateJwt(data[0].id, login, data[0].role);
      return res.json({ jwtToken });
    } catch (e) {
      console.log(e);
      return res.status(400).json("Login error");
    }
  }

  async auth(req, res) {
    try {
      const { id, login, role } = req.user;
      const { data } = await Services.findUser({
        login,
      });
      if (!data.length) {
        return res.status(403).send("Пользователь не найден!");
      }
      const jwtToken = generateJwt(id, login, role);
      return res.json({ jwtToken });
    } catch (e) {
      console.log(e);
      return res.status(403).send("Пользователь не найден!");
    }
  }

  async add(req, res) {
    try {
      const { title, description, userId } = req.body;
      await Services.createPost({
        title,
        description,
        claps: 0,
        createdAt: new Date(),
        updateAt: new Date(),
        userId,
      });
      res.json({ message: "New post add" });
    } catch (e) {
      console.log(e);
      res.status(400).send("Server error");
    }
  }
}

export default new Controller();
