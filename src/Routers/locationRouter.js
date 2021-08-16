import express from "express";
import locationController from "../Locations/locations.controller";
import routes from "../routes";

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
locationRouter.get(routes.users, locationController.getUserLocations);
locationRouter.post(routes.users, locationController.postUserLocation);

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
