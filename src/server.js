import jsonServer from "json-server";
import path from "path";
import controller from "./server/controllers.js";
import doteenv from "dotenv";
import authMiddleware from "./server/authMiddleware.js";

const __dirname = path.join();
doteenv.config({ path: path.join(__dirname, "./src/.env") });

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "./src/db.json"));
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/api/login", controller.login);
server.post("/api/registration", controller.registration);
server.post("/api/add", controller.add);

server.get("/api/auth", authMiddleware, controller.auth);

server.use("/api", router);

server.listen(PORT, () => console.log(`server started on port ${PORT}`));
