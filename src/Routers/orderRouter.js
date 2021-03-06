import express from "express";
import jwtMiddleware from "../Config/jwtMiddleware";
import orderController from "../Orders/orders.controller";
import routes from "../routes";

const orderRouter = express.Router();

orderRouter.get(routes.start, jwtMiddleware, orderController.getUserOrders);
orderRouter.post(routes.start, jwtMiddleware, orderController.postUserOrder);

orderRouter.get(
  routes.history,
  jwtMiddleware,
  orderController.getUserOrderPast
);

orderRouter.patch(routes.orderDetail, orderController.patchOrder);

export default orderRouter;
