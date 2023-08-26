import e from "express";
import * as LoginService from "../services/loginService.js";

const loginRouter = e.Router();

loginRouter.get("/", LoginService.getLogin);
loginRouter.post("/", LoginService.createLogin);
loginRouter.put("/:id", LoginService.updateLogin);
loginRouter.delete("/:id", LoginService.deleteLogin);
loginRouter.get("/:id", LoginService.getDataByIdLogin);
loginRouter.post("/auth", LoginService.authenticationUser);
export default loginRouter;
