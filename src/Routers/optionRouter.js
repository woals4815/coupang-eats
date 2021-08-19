import express from "express";
import optionController from "../Restaurants/Options/options.controller";
import routes from "../routes";

const optionRouter = express.Router();

//옵션 전체 조회
optionRouter.get(routes.start, optionController.getOptions);
optionRouter.post(routes.start, optionController.postOption);

//옵션
optionRouter.get(routes.menuDetail);

export default optionRouter;
