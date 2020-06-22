import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getJoin, postJoin, login, logout} from "../controllers/userController";

// export const userRouter = express.Router();
const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

// globalRouter.get(routes.home, (req,res) => res.send('HOME'));
// globalRouter.get(routes.join, (req,res) => res.send('join'));
// globalRouter.get(routes.login, (req,res) => res.send('login'));
// globalRouter.get(routes.logout, (req,res) => res.send('logout'));
// globalRouter.get(routes.search, (req,res) => res.send('search'));

export default globalRouter;