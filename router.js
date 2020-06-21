import express from "express";

export const userRouter = express.Router();

userRouter.get("/",(req, res) => res.send('user index'));
userRouter.get("/edit",(req, res) => res.send('user edit'));
userRouter.get("/password",(req, res) => res.send('user password'));
//라우트를 확장 시킬 수 있음. /password/update  /password/confirm  /password/reset 등 