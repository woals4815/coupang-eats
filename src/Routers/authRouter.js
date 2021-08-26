import express from "express";
import authController from "../Auth/auth.controller";
import routes from "../routes";

const authRouter = express.Router();

authRouter.get(routes.kakaoAuth, authController.getKakaoAuthUrl);
authRouter.get(routes.kakaoAuthCallback, authController.getKakaoAuthCode);

authRouter.get(routes.googleAuth, authController.getGoogleAuthURL);
authRouter.get(routes.googleAuthCallback, authController.getGoogleUser);

authRouter.post(routes.smsAuth, authController.getSMSAuth);

export default authRouter;
