import { Router } from "express";
import { users, auth } from "./controllers";
import { authMiddleware } from "./middlewares";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Olá");
});

routes.post("/create", users.create);
routes.post("/login", auth.Authenticate);

routes.use(authMiddleware);

routes.get("/home", auth.Index);

export default routes;
