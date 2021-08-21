import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import {
  selectReviews,
  selectReviewsByRestaurant,
  selectReviewsByRestaurantOrderHelp,
  selectReviewsByRestaurantOrderRating,
} from "./reviews.dao";

const retrieveReviews = async (query) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const { restaurantId, order } = query;
  try {
    if (restaurantId) {
      if (order === "rating") {
        //별점을 높이 남긴 리뷰 순
        const selectResult = await selectReviewsByRestaurantOrderRating(
          connection,
          restaurantId
        );

        const result = { ...baseResponse.SUCCESS, result: selectResult };

        return { result };
      } else if (order === "help") {
        //도움이 돼요 많이 받은 리뷰
        const selectResult = await selectReviewsByRestaurantOrderHelp(
          connection,
          restaurantId
        );

        const result = { ...baseResponse.SUCCESS, result: selectResult };

        return { result };
      } else {
        //리뷰 최신순
        const selectResult = await selectReviewsByRestaurant(
          connection,
          restaurantId
        );

        const result = { ...baseResponse.SUCCESS, result: selectResult };

        return { result };
      }
    } else {
      const selectResult = await selectReviews(connection);

      const result = { ...baseResponse.SUCCESS, result: selectResult };

      return { result };
    }
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const reviewProvider = {
  retrieveReviews,
};

export default reviewProvider;
