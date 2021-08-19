import responseHandler from "../Config/responseHandler";
import validationSchema from "../Validations/validationSchema";
import cartProvider from "./carts.provider";
import cartService from "./carts.service";

const getCarts = async (req, res) => {
  try {
    const { result, error } = await cartProvider.retrieveCarts();
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
  const { body } = req;
  try {
    await validationSchema.validatePostCart(body);

    const { result, error } = await cartService.createCart(body);

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
  const { body } = req;
  try {
    await validationSchema.validatePostOptionCart(body);

    const { result, error } = await cartService.createOptionCart(body);
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
};

export default cartController;
