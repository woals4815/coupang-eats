import responseHandler from "../Config/responseHandler";
import validationSchema from "../Validations/validationSchema";
import userProvider from "./users.provider";
import userService from "./users.service";

const getUsers = async (req, res) => {
  try {
    const { result, error } = await userProvider.retrieveUsers();
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
  const {
    params: { userId },
  } = req;
  try {
  } catch (error) {}
};
const postLogin = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  try {
    await validationSchema.validateLoginBody({ email, password });

    const { result, error } = await userService.loginUser({ email, password });
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
};

export default userController;
