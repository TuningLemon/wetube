//const express = require('express')
import express from "express";
import morgan from "morgan";// morgan은 로그. 미들웨어.  
import helmet from "helmet";// node.js 앱 보안에 필요 미들웨어 
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";
import { localsMdiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const app = express();

app.use(helmet());//보안을 위해서. 
app.set('view engine',"pug"); // view 템플릿이 pug.js 를 적용시키자. 

// const PORT = 4000;

// const handleListening = () => console.log(`Listening on : http://localhost:${PORT}`);

// function handleListening(){
//     console.log(`Listening on : http://localhost:${PORT}`);
// }

// const handleHome = (req, res) => res.send("Hello from Vision Home");
// // function handleHome(req,res){
// //     console.log(req);
// //     res.send("Hello from home");
// // }

// const handleProfile = (req,res) => res.send("!!You are on my Profile");

// function handleProfile(req,res){
    //     res.send("You are on my Profile");
    // }


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan("dev")); //morgan에 다양한 로깅옵션이 있음. 로깅이란? 무슨 일이 어디에 일어났는지 기록하기.
app.use(localsMdiddleware);

// const middleware = (req, res, next) => {
//     res. send("not happening");//이 경우에는 middleware가 next();를 안 넣었기 때문에 연결이 끊김. 
// }
//----------- 미들웨어-------------//
// const betweenHome = (req, res, next) => {
//     console.log("I am between");
//     next(); //next로 다음 미들웨어로 넘어감.  
// }

// app.use(betweenHome); //미들웨어의 위치는  중요함. 미들웨어 아래에 있는 라우트에 대해서만 미들웨어 적용 가능. 

// app.get("/",middleware, handleHome);
// // app.get("/",betweenHome, handleHome); //미들웨어를 얼마든지 넣을 수 있음. 

// app.get("/profile",handleProfile);
// // app.listen(PORT, handleListening);

//app.get("/user", userRouter); 원래 이거 였는데, app.use로 바꾼 이유. 
//app.use("/", globalRouter);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
// app.use("/users", userRouter);//누군가 user에 접속하면, userRouter를 다 사용하겠다는 뜻.  
// app.use("/videos", videoRouter);

export default app;
