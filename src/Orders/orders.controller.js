import responseHandler from "../Config/responseHandler";
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

  console.log(userId);
  try {
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

const orderController = {
  getUserOrders,
  postUserOrder,
};

export default orderController;
