import responseHandler from "../Config/responseHandler";
import reviewProvider from "./reviews.provider";
import reviewService from "./reviews.service";

const getReviews = async (req, res) => {
  const { query } = req;
  try {
    const { result, error } = await reviewProvider.retrieveReviews(query);

    if (result) {
      return responseHandler.successResponse(res, result);
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};

const postReview = async (req, res) => {
  const { userId, body } = req;
  try {
    const { result, error } = await reviewService.createReview({
      userId,
      ...body,
    });

    if (result) {
      return responseHandler.successResponse(res, result);
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};

const getReviewByRestaurant = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};

const reviewController = {
  getReviews,
  postReview,
  getReviewByRestaurant,
};

export default reviewController;
