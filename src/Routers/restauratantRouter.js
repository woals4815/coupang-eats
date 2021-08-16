import express from "express";
import routes from "../routes";
import restaurantController from "../Restaurants/restaurants.controller";

const restaurantRouter = express.Router();

restaurantRouter.get(routes.start, restaurantController.getRestaurants);
restaurantRouter.post(routes.start, restaurantController.postRestaurant);

restaurantRouter.get(
  routes.restaurantId,
  restaurantController.getRestaurantById
);

export default restaurantRouter;
