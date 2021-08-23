import express from "express";
import menuController from "../Restaurants/Menus/menus.controller";
import routes from "../routes";

const menuRouter = express.Router();
//디비에 있는 메뉴 전체 조회
menuRouter.get(routes.start, menuController.getMenus);
//메뉴 생성 api
menuRouter.post(routes.start, menuController.postMenu);
//특정 메뉴 조회
menuRouter.get(routes.menuDetail, menuController.getMenuById);

export default menuRouter;
