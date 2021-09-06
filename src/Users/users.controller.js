import baseResponse from "../Config/baseResponse";
import responseHandler from "../Config/responseHandler";
import validationSchema from "../Validations/validationSchema";
import userProvider from "./users.provider";
import userService from "./users.service";

const getUsers = async (req, res) => {
  try {
    const { result, error } = await userProvider.retrieveUsers();
    throw new Error("hey");
    if (result) {
      return responseHandler.successResponse(res, result);
    } else {
      throw error;
    }
  } catch (error) {
    return responseHandler.errResponse(res, error);
  }
};
//회원가입
const postUser = async (req, res) => {
  const {
    body: { email, password, name, phoneNumber },
  } = req;
  try {
    await validationSchema.validatePostUserBody({
      email,
      password,
      name,
      phoneNumber,
    });
    const { result, error } = await userService.createUser({
      email,
      password,
      name,
      phoneNumber,
    });
    if (result) {
      return responseHandler.successResponse(res, result);
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};
const getUserById = async (req, res) => {
  let {
    params: { userId },
  } = req;
  userId = Number(userId);
  try {
    await validationSchema.validateNumber(userId);

    const { result, error } = await userProvider.retrieveUserById(userId);
    if (result) {
      return responseHandler.successResponse(res, result);
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};

const getUserProfile = async (req, res) => {
  let { userId } = req;
  userId = Number(userId);
  try {
    await validationSchema.validateNumber(userId);
    const { result, error } = await userProvider.retrieveUserById(userId);
    if (result) {
      return responseHandler.successResponse(res, result);
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};

const postLogin = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  try {
    await validationSchema.validateLoginBody({ email, password });

    const { result, error } = await userService.loginUser({ email, password });
    console.log(error);
    if (result) {
      return responseHandler.successResponse(res, result);
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};

const userController = {
  getUsers,
  postUser,
  postLogin,
  getUserById,
  getUserProfile,
};

export default userController;
