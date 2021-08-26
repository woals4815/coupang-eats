import express from "express";
import jwtMiddleware from "../Config/jwtMiddleware";
import reviewController from "../Reviews/reviews.controller";
import routes from "../routes";

const reviewRouter = express.Router();

reviewRouter.get(routes.start, reviewController.getReviews);
reviewRouter.post(routes.start, jwtMiddleware, reviewController.postReview);

reviewRouter.post(
  routes.reviewLikes,
  jwtMiddleware,
  reviewController.postReviewLike
);

export default reviewRouter;
