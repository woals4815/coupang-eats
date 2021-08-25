import express from "express";
import authController from "../Auth/auth.controller";
import routes from "../routes";

const authRouter = express.Router();

authRouter.get(routes.kakaoAuth, authController.getKakaoAuthUrl);
authRouter.get(routes.kakaoAuthCallback, authController.getKakaoAuthCode);

export default authRouter;
