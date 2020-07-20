import mongoose from "mongoose";
import dotenv from "dotenv";

// .env 파일 안에 있는 정보를 불러옴. 찾은 모든 variable을 process.env.key에 저장.
dotenv.config();

mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  // process.env.MONGO_URL 내 컴퓨터 서버 사용할 때,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
const handleOpen = () => console.log("Connected to DB");
const handeleError = (error) => console.log(`Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handeleError);
