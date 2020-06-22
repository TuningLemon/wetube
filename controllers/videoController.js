//export const home = (req,res) => res.render("Home");
// res.send >> res.render로 수정. 
import {videos} from "../db"

export const home = (req,res) => res.render("home",{ pageTitle: "HOME", videos});
// export const search = (req,res) => res.render("Search", { pageTitle: "Search"});
export const search = (req,res) => {
    //const searchingBy = req.query.term; 와 동일. const {} =req;
    const {
        query: { term: searchingBy }
    } = req;
    // console.log(req.query.term);
    res.render("search", { pageTitle: "Search", searchingBy: searchingBy});
};

export const upload = (req,res) => res.render("upload", { pageTitle: "Upload"}); 
export const videoDetail = (req,res) => res.render("videoDetail", { pageTitle: "Video Detail"}); 
export const editVideo = (req,res) => res.render("editVideo", { pageTitle: "Edit Video"}); 
export const deleteVideo = (req,res) => res.render("deleteVideo", { pageTitle: "Delete Video"}); 

