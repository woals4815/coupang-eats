import express from "express";
import foodCategoriesController from "../Categories/FoodCategories/foodCategories.controller";
import routes from "../routes";
const foodCategoryRouter = express.Router();

//음식 종류 카테고리 전체 조회
foodCategoryRouter.get(
  routes.foodCategory,
  foodCategoriesController.getFoodCategories
);
//음식 종류 카테고리 생성
foodCategoryRouter.post(
  routes.foodCategory,
  foodCategoriesController.postFoodCategories
);

//식당 정보 카테고리
foodCategoryRouter.get(routes.infoCategory);
foodCategoryRouter.post(routes.infoCategory);

//특정 식당 메뉴 카테고리
foodCategoryRouter.get(routes.menuCategory);
foodCategoryRouter.post(routes.menuCategory);

//특정 메뉴 옵션 카테고리
foodCategoryRouter.get(routes.optionCategory);
foodCategoryRouter.post(routes.optionCategory);

export default foodCategoryRouter;
