import express from "express";
import cartController from "../Carts/carts.controller";
import routes from "../routes";

const cartRotuer = express.Router();
//전체 카트 리스트 조회
cartRotuer.get(routes.start, cartController.getCarts);
//카트 생성(담기)
cartRotuer.post(routes.start, cartController.postCart);

//옵션 카트 생성(담기)
cartRotuer.post(routes.options, cartController.postOptionCart);

export default cartRotuer;
