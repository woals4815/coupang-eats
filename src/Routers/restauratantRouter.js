import express from "express";
import routes from "../routes";

const restaurantRouter = express.Router();

restaurantRouter.get(routes.start);
restaurantRouter.post(routes.start);

restaurantRouter.get(routes.restaurantId);
