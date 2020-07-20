/* eslint-disable prettier/prettier */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
// export const home = (req,res) => res.render("Home");
// res.send >> res.render로 수정.
// import {videos} from "../db";

import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    // async는 awair 이랑 같이 사용.
    const video = await Video.find({}).sort({ _id: -1 }); // -1은 역순의미
    // await이 끝나기 전까지 다음행으로 넘어가지 않음.
    res.render("home", { pageTitle: "HOME", video });
    // export const search = (req,res) => res.render("Search", { pageTitle: "Search"});
  } catch (error) {
    console.log("error home");
    res.render("home", { pageTitle: "HOME", video: [] }); // 에러 났을 때 빈 array출력
  }
};
export const search = async (req, res) => {
  // const searchingBy = req.query.term; 와 동일. const {} =req;
  const {
    query: { term: searchingBy },
  } = req;
  // eslint-disable-next-line prefer-const
  let video = []; // let은 변하지만, const는 고정.

  try {
    video = await Video.find({
      // 정규표현식에 일치하는 것을 가져오기 위한 메소드 대소문자 관계없이
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  // console.log(req.query.term);
  res.render("search", { pageTitle: "Search", searchingBy, video });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    // body, file
    body: { title, description },
    // file: { path },
    file: { location },
  } = req;

  console.log(req.file); // Amazon에서 받은 FILE 정보의 Json파일 확인 가능.

  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
  // console.log(file, titlel, description);
  // console.dir(file, titlel, description);
  // res.redirect(routes.videoDetail(333333));
  // To Do : Upload and save video
  // res.redirect(routes.videoDetail());
};

export const videoDetail = async (req, res) => {
  // console.log(req.params);
  const {
    params: { id }, // 여기서 id는 routes id.
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log("error videoDetail");
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }, // video.id (videoDetail의 editbutton)
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator != req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }, // editVideo.pug 에서 Title 작성했다가 오류나서 매우 고생.
  } = req;
  console.log(id, title, description);
  try {
    await Video.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true }
    );
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log("error postEditVideo");
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator != req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log("deleteVideo Err");
  }
  res.redirect(routes.home);
};

//Register Video View
export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
};
//Add Comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;

  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
    res.send(newComment.id);
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Delete Comments
export const postDeleteComment = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const comment = await Comment.findById(id).populate("creator");
    console.log(
      typeof req.user.id,
      req.user.id,
      typeof comment.creator.id,
      comment.creator.id
    );

    if (comment.creator.id !== req.user.id) {
      throw Error();
    } else {
      await Comment.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log("deleteComment Err : User is not this comment owner");
    res.status(403);
  } finally {
    res.end();
  }
};
