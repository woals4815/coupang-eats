import responseHandler from "../Config/responseHandler";
import validationSchema from "../Validations/validationSchema";
import orderProvider from "./orders.provider";
import orderService from "./orders.service";

const getUserOrders = async (req, res) => {
  const { userId } = req;
  try {
    const { result, error } = await orderProvider.retrieveOrderByUserId(userId);

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

const postUserOrder = async (req, res) => {
  const {
    userId,
    body: { cartId },
  } = req;
  try {
    await validationSchema.validatePostOrder({ userId, cartId });

    const { result, error } = await orderService.createOrder({
      cartId,
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

const patchOrder = async (req, res) => {
  let {
    params: { orderId },
  } = req;
  orderId = Number(orderId);
  try {
    await validationSchema.validateNumber(orderId);

    const { result, error } = await orderService.editOrderComplete(orderId);

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

const getUserOrderPast = async (req, res) => {
  let { userId } = req;

  userId = Number(userId);

  try {
    await validationSchema.validateNumber(userId);

    const { result, error } = await orderProvider.retrieveCompleteOrder(userId);

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

const orderController = {
  getUserOrders,
  postUserOrder,
  patchOrder,
  getUserOrderPast,
};

export default orderController;
