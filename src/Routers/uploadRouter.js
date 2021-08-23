import express from "express";
import routes from "../routes";
import uploadController from "../Uploads/uploads.controller";
import uploadImg from "../Uploads/uploads.middleware";

const uploadRouter = express.Router();

uploadRouter.post(
  routes.restaurants,
  uploadImg,
  uploadController.postUploadRestaurantImg
);

uploadRouter.post(
  routes.categories,
  uploadImg,
  uploadController.postUploadCategoryImg
);

uploadRouter.post(routes.menus, uploadImg, uploadController.postUploadMenuImg);

export default uploadRouter;
