import express from "express";
import routes from "../routes";
import {
    userDetail,
    editProfile,
    changePassword
} from "../controllers/userController";

// export const userRouter = express.Router();

const userRouter = express.Router();
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);

// 함수들을 controller에 분리하는 작업. 
// userRouter.get(routes.users, (req,res) => res.send('Users'));
// userRouter.get(routes.userDetail, (req,res) => res.send('User Detail'));
// userRouter.get(routes.editProfile, (req,res) => res.send('Edit Profile'));
// userRouter.get(routes.changePassword, (req,res) => res.send('Change Password'));

export default userRouter;