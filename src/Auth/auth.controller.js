import axios from "axios";
import baseResponse from "../Config/baseResponse";
import responseHandler from "../Config/responseHandler";
import qs from "qs";
import userProvider from "../Users/users.provider";
import userService from "../Users/users.service";
import { google } from "googleapis";
import { sendSMS } from "../Config/signature";

const kakaoRedirectUri = "http://localhost:3000/auth/kakao/callback";

const getKakaoAuthUrl = (req, res) => {
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_ID}&redirect_uri=${kakaoRedirectUri}&response_type=code&scope=profile_nickname%2Caccount_email`;

  res.redirect(kakaoUrl);
};

const getKakaoAuthCode = async (req, res) => {
  try {
    const token = await axios({
      //token
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      data: qs.stringify({
        grant_type: "authorization_code", //특정 스트링
        client_id: process.env.KAKAO_ID,
        client_secret: process.env.KAKAO_SECRET,
        redirectUri: kakaoRedirectUri,
        code: req.query.code, //결과값을 반환했다. 안됐다.
      }),
      //객체를 string 으로 변환
    });
    const {
      data: { access_token },
    } = token;
    if (access_token) {
      const user = await axios({
        method: "get",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${access_token}`,
        }, //헤더에 내용을 보고 보내주겠다.
      });
      const {
        data: {
          kakao_account: {
            email,
            profile: { nickname },
          },
        },
      } = user;
      const { result } = await userProvider.retrieveUserByEmail(email);
      if (result.length > 0) {
        const { result: loginResult, error: loginError } =
          await userService.loginUser({
            email: email,
            password: process.env.USER_SECRET_PASSWORD,
          });
        if (loginResult) {
          return responseHandler.successResponse(res, loginResult);
        } else {
          throw loginError;
        }
      } else {
        const userInfo = {
          email: email,
          name: nickname,
          password: process.env.USER_SECRET_PASSWORD,
          phoneNumber: "01000000000",
        };
        const { result: createResult, error } = await userService.createUser(
          userInfo
        );
        if (createResult) {
          const { result: loginResult, error: loginError } =
            await userService.loginUser({
              email: email,
              password: process.env.USER_SECRET_PASSWORD,
            });
          if (loginResult) {
            return responseHandler.successResponse(res, loginResult);
          } else {
            throw loginError;
          }
        } else {
          throw error;
        }
      }
    } else {
      throw baseResponse.SOCAIL_LOGIN_ERROR;
    }
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET,
  "http://localhost:3000/auth/google/callback"
);
const getGoogleAuthURL = async (req, res) => {
  try {
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/user.phonenumbers.read",
    ];
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: scopes,
    });

    if (authUrl) {
      res.redirect(authUrl);
    } else {
      throw baseResponse.SOCAIL_LOGIN_ERROR;
    }
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};

const getGoogleUser = async (req, res, next) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);

    const googleUser = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    );
    const {
      status,
      data: { email, name },
    } = googleUser;

    const { result, error } = await userProvider.retrieveUserByEmail(email);
    if (result.length > 0) {
      const { result: loginResult, error: loginError } =
        await userService.loginUser({
          email: email,
          password: process.env.USER_SECRET_PASSWORD,
        });
      if (loginResult) {
        return responseHandler.successResponse(res, loginResult);
      } else {
        throw loginError;
      }
    } else {
      const userInfo = {
        email: email,
        name: name,
        password: process.env.USER_SECRET_PASSWORD,
        phoneNumber: "01000000000",
      };
      const { result: createResult, error } = await userService.createUser(
        userInfo
      );
      if (createResult) {
        const { result: loginResult, error: loginError } =
          await userService.loginUser({
            email: email,
            password: process.env.USER_SECRET_PASSWORD,
          });
        if (loginResult) {
          return responseHandler.successResponse(res, loginResult);
        } else {
          throw loginError;
        }
      } else {
        throw error;
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send(errResponse(baseResponse.FAIL));
  }
};

const getSMSAuth = async (req, res) => {
  const {
    body: { phoneNumber },
  } = req;
  try {
    await sendSMS(phoneNumber);
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};

const authController = {
  getKakaoAuthUrl,
  getKakaoAuthCode,
  getGoogleAuthURL,
  getGoogleUser,
  getSMSAuth,
};

export default authController;
