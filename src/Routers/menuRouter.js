import express from "express";
import menuController from "../Restaurants/Menus/menus.controller";
import routes from "../routes";

const menuRouter = express.Router();

menuRouter.get(routes.start, menuController.getMenus);
menuRouter.post(routes.start, menuController.postMenu);

export default menuRouter;
