import express from "express";
import jwtMiddleware from "../Config/jwtMiddleware";
import routes from "../routes";
import userController from "../Users/users.controller";
const userRouter = express.Router();

//router REST
//전체 유저 조회
userRouter.get(routes.start, userController.getUsers);
//회원가입
userRouter.post(routes.start, userController.postUser);
//로그인
userRouter.post(routes.login, userController.postLogin);
//내 프로필 보기
userRouter.get(
  routes.userProfile,
  jwtMiddleware,
  userController.getUserProfile
);
userRouter.get(routes.userId, userController.getUserById);
export default userRouter;
