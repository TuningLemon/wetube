/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable linebreak-style */
// export const home = (req,res) => res.render("Home");
// res.send >> res.render로 수정.
import dotenv from "dotenv";
import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import { json } from "body-parser";
// import { RSA_NO_PADDING } from "constants";

dotenv.config();

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    // console.log(req.body);
    res.render("join", { pageTitle: "Join" });
  } else {
    // to do: register user
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};
export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email },
  } = profile;

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("videos");
    console.log(user);
    res.render("userDetail", {
      pageTitle: "user Detail ",
      user,
      avatarDefault: process.env.AVATAR_DEFAULT,
    });
  } catch (error) {
    res.redirect(routes.home);
  }
  // res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const logout = (req, res) => {
  // res.render("logout", { pageTitle: "Logout"});
  // to do: process log out
  req.logout();
  res.redirect(routes.home);
  console.log("logout completed");
};

// getMe 와 userDetail의 차이가 헷갈림.
export const userDetail = async (req, res) => {
  // console.log(req.params);
  const {
    params: { id }, // 여기서 id는 routes id.
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "user Detail ", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file: { location },
  } = req;

  console.log(req.file);
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      // avatarUrl: file ? file.path : req.user.avatarUrl,  > AmazonS3로 이동하면서 삭제.
      // avatarUrl: file ? file.location : req.user.avatarUrl,
      avatarUrl: location,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect("editProfile", { pageTitle: "Edit Profile" });
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (req.newPassword !== req.newPassword1) {
      console.log("Wrong Password");
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    console.log("Matching Password");

    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};
