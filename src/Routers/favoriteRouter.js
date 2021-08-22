import express from "express";
import jwtMiddleware from "../Config/jwtMiddleware";
import favoriteController from "../Favorites/favorites.controller";
import routes from "../routes";

const favoriteRouter = express.Router();

favoriteRouter.get(
  routes.start,
  jwtMiddleware,
  favoriteController.getUserFavorites
);
favoriteRouter.post(
  routes.start,
  jwtMiddleware,
  favoriteController.postFavorites
);

export default favoriteRouter;
