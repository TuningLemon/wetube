import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";
// var multer  = require('multer')

// const multerVideo = multer({ dest: "uploads/videos/" });
// const multerAvatar = multer({ dest: "uploads/avatars/" });

dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "tuninglemonvideo/video",
  }),
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "tuninglemonvideo/avatar",
  }),
});

export const uploadVideo = multerVideo.single("videoFile"); // videoRouter.js 에 import
export const uploadAvatar = multerAvatar.single("avatar"); // userRouter.js 에 import

export const localsMiddleware = (req, res, next) => {
  // 미들웨어로 로컬변수를 global 변수로 사용하도록 만든다.
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
