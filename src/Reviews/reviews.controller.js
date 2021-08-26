import responseHandler from "../Config/responseHandler";
import validationSchema from "../Validations/validationSchema";
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
    await validationSchema.validatePostReview({ userId, ...body });

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

const postReviewLike = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);

    return responseHandler.errResponse(res, error);
  }
};

const reviewController = {
  getReviews,
  postReview,
  postReviewLike,
};

export default reviewController;
