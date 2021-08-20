import express from "express";
import orderController from "../Orders/orders.controller";
import routes from "../routes";

const orderRouter = express.Router();

orderRouter.get(routes.start, orderController.getUserOrders);
orderRouter.post(routes.start, orderController.postUserOrder);

export default orderRouter;
