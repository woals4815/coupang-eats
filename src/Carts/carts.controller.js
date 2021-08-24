import responseHandler from "../Config/responseHandler";
import validationSchema from "../Validations/validationSchema";
import cartProvider from "./carts.provider";
import cartService from "./carts.service";

const getCarts = async (req, res) => {
  let { userId } = req;
  userId = Number(userId);
  try {
    await validationSchema.validateNumber(userId);

    const { result, error } = await cartProvider.retrieveCarts(userId);
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

const postCart = async (req, res) => {
  let { userId, body } = req;
  try {
    await validationSchema.validatePostCart({ userId, ...body });

    const { result, error } = await cartService.createCart({ userId, ...body });

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

const postOptionCart = async (req, res) => {
  const { body, userId } = req;
  try {
    await validationSchema.validatePostOptionCart(body);

    const { result, error } = await cartService.createOptionCart({
      ...body,
      userId,
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

const getOptionCarts = async (req, res) => {
  let { userId } = req;
  userId = Number(userId);
  try {
    await validationSchema.validateNumber(userId);

    const { result, error } = await cartProvider.retrieveOptionCarts(userId);
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

const cartController = {
  getCarts,
  postCart,
  postOptionCart,
  getOptionCarts,
};

export default cartController;
