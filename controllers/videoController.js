//export const home = (req,res) => res.render("Home");
// res.send >> res.render로 수정. 
export const home = (req,res) => res.render("home",{ pageTitle: "HOME", potato:1234});
// export const search = (req,res) => res.render("Search", { pageTitle: "Search"});
export const search = (req,res) => {
    //const searchingBy = req.query.term; 와 동일. const {} =req;
    const {query: { term: searchingBy }
    } = req;
    // console.log(req.query.term);
    res.render("search", { pageTitle: "Search", searchingBy: searchingBy});
};
export const videos = (req,res) => res.render("videos", { pageTitle: "Videos"}); 
export const upload = (req,res) => res.render("upload", { pageTitle: "Upload"}); 
export const videoDetail = (req,res) => res.render("video Detail", { pageTitle: "Video Detail"}); 
export const editVideo = (req,res) => res.render("edit Video", { pageTitle: "Edit Video"}); 
export const deleteVideo = (req,res) => res.render("delete Video", { pageTitle: "Delete Video"}); 

