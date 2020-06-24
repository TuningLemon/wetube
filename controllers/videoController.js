//export const home = (req,res) => res.render("Home");
// res.send >> res.render로 수정. 
import {videos} from "../db";
import routes from "../routes";

export const home = (req,res) => res.render("home",{ pageTitle: "HOME", videos});
// export const search = (req,res) => res.render("Search", { pageTitle: "Search"});
export const search = (req,res) => {
    //const searchingBy = req.query.term; 와 동일. const {} =req;
    const {
        query: { term: searchingBy }
    } = req;
    // console.log(req.query.term);
    res.render("search", { pageTitle: "Search", searchingBy: searchingBy, videos});
};

export const getUpload = (req,res) => 
    res.render("upload", { pageTitle: "Upload"}); 

export const postUpload = (req,res) => {
    const {
        body: {file, title, description}
    } = req;
    //res.redirect(routes.videoDetail(333333));
    // To Do : Upload and save video
    res.redirect(routes.videoDetail());
};

export const videoDetail = (req,res) => res.render("videoDetail", { pageTitle: "Video Detail"}); 
export const editVideo = (req,res) => res.render("editVideo", { pageTitle: "Edit Video"}); 
export const deleteVideo = (req,res) => res.render("deleteVideo", { pageTitle: "Delete Video"}); 

