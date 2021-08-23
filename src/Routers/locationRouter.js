import express from "express";
import locationController from "../Locations/locations.controller";
import routes from "../routes";
import jwtMiddleware from "../Config/jwtMiddleware";
const locationRouter = express.Router();
// /locations/restaurants
locationRouter.get(
  routes.restaurants,
  locationController.getRestaurantLocations
);
// /locations/restaurants
locationRouter.post(
  routes.restaurants,
  locationController.postRestaurantLocation
);

// /locations/users
locationRouter.get(
  routes.users,
  jwtMiddleware,
  locationController.getUserLocationById
);
locationRouter.post(
  routes.users,
  jwtMiddleware,
  locationController.postUserLocation
);

// /locations/restaurants/:restaurantId
locationRouter.get(
  routes.restaurantLocationDetail,
  locationController.getRestaurantLocationById
);

// /locations/users/:userId
locationRouter.get(
  routes.userLocationDetail,
  locationController.getUserLocationById
);

export default locationRouter;
