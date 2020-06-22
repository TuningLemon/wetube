//export const home = (req,res) => res.render("Home");
// res.send >> res.render로 수정. 
import routes from "../routes"

export const getJoin = (req,res) => {
    res.render("join", { pageTitle: "Join"});
}

export const postJoin = (req,res) => {
    const {
        body: {name, email, password, password2}
    } = req;
    if(password != password2){
        res.status(400);
        //console.log(req.body);
        res.render("join", { pageTitle: "Join"});
    } else {
        // to do: register user
        // to do: log user in 
        res.redirect(routes.home);

    }

}
export const getLogin = (req,res) => res.render("login", { pageTitle: "Login"});
export const postLogin = (req,res) => {
    res.redirect(routes.home);
}

export const logout = (req,res) => res.render("logout", { pageTitle: "Logout"});
export const userDetail = (req,res) => res.render(routes.userDetail(), { pageTitle: "User Detail"});
export const editProfile = (req,res) => res.render("editProfile", { pageTitle: "Edit Profile"});
export const changePassword = (req,res) => res.render("changePassword", { pageTitle: "Change Password"});
