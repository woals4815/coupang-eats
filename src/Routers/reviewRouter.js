import express from "express";
import reviewController from "../Reviews/reviews.controller";
import routes from "../routes";

const reviewRouter = express.Router();

reviewRouter.get(routes.start, reviewController.getReviews);
reviewRouter.post(routes.start, reviewController.postReview);

export default reviewRouter;
