/* eslint-disable prettier/prettier */
import express from "express";
import routes from "../routes";
import {
  getUpload,
  postUpload,
  videoDetail,
  getEditVideo,
  postEditVideo,
  deleteVideo,
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

// upload
// videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, onlyPrivate, getUpload);
// uploadVideo 미들웨어 삽입.
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

// videoRouter.get(routes.videos, (req,res) => res.send('Videos'));
// videoRouter.get(routes.upload, (req,res) => res.send('Upload'));
// videoRouter.get(routes.videoDetail, (req,res) => res.send('Video Detail'));
// videoRouter.get(routes.editVideo, (req,res) => res.send('Edit Video'));
// videoRouter.get(routes.deleteVideo, (req,res) => res.send('Delte Video'));

export default videoRouter;
