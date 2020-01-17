//const express = require('express')
import express from "express";
import morgan from "morgan";// morgan은 로그. 미들웨어.  
import helmet from "helmet";// node.js 앱 보안에 필요 미들웨어 
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

// const PORT = 4000;

// const handleListening = () => console.log(`Listening on : http://localhost:${PORT}`);

// function handleListening(){
//     console.log(`Listening on : http://localhost:${PORT}`);
// }

const handleHome = (req, res) => res.send("Hello from Vision Home");
// function handleHome(req,res){
//     console.log(req);
//     res.send("Hello from home");
// }

const handleProfile = (req,res) => res.send("!!You are on my Profile");

// function handleProfile(req,res){
    //     res.send("You are on my Profile");
    // }

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(helmet());//보안을 위해서. 
app.use(morgan("dev")); //로그. 모든 것을 기록하고. 

const middleware = (req, res, next) => {
    res. send("not happening");
}
//----------- 미들웨어-------------//
// const betweenHome = (req, res, next) => {
//     console.log("I am between");
//     next(); //next로 다음 미들웨어로 넘어감. 
// }

// app.use(betweenHome); //미들웨어의 위치는  중요함. 미들웨어 아래에 있는 라우트에 대해서만 미들웨어 적용 가능. 

app.get("/",middleware, handleHome);
// app.get("/",betweenHome, handleHome); //미들웨어를 얼마든지 넣을 수 있음. 

app.get("/profile",handleProfile);

// app.listen(PORT, handleListening);

export default app;