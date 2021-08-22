import express from "express";
import routes from "../routes";
import uploadController from "../Uploads/uploads.controller";
import uploadImg from "../Uploads/uploads.middleware";

const uploadRouter = express.Router();

uploadRouter.post(
  routes.start,
  uploadImg,
  uploadController.postUploadRestaurantImg
);

export default uploadRouter;
