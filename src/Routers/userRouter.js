import express from "express";
import routes from "../routes";
import userController from "../Users/users.controller";
const userRouter = express.Router();
//컨테이너로 userConroller class 가져옴

//router REST
userRouter.get(routes.start, userController.getUsers);
userRouter.post(routes.start, userController.postUser);
userRouter.post(routes.login, userController.postLogin);
userRouter.get(routes.userId, userController.getUserById);

export default userRouter;
