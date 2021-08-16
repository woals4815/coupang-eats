import express from "express";
import jwtMiddleware from "../Config/jwtMiddleware";
import routes from "../routes";
import userController from "../Users/users.controller";
const userRouter = express.Router();

//router REST
userRouter.get(routes.start, userController.getUsers);
userRouter.post(routes.start, userController.postUser);
userRouter.post(routes.login, userController.postLogin);
userRouter.get(
  routes.userProfile,
  jwtMiddleware,
  userController.getUserProfile
);
userRouter.get(routes.userId, userController.getUserById);
export default userRouter;
