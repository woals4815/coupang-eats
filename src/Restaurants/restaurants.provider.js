import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import {
  selectRestaurantById,
  selectRestaurantImg,
  selectRestaurants,
  selectRestaurantsByKeyword,
  selectRestaurantsByKeywordOrderBest,
  selectRestaurantsByKeywordOrderMany,
  selectRestaurantsByKeywordOrderNew,
  selectRestaurantsOrderBest,
  selectRestaurantsOrderMany,
  selectRestaurantsOrderNew,
} from "./restaurants.dao";

const retrieveRestaurants = async (order) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    if (order === "many") {
      const selectResult = await selectRestaurantsOrderMany(connection);

      selectResult.forEach((restaurant) => {
        restaurant.ratingAvg =
          restaurant.ratingAvg === null ? 0 : restaurant.ratingAvg;
      });

      const result = { ...baseResponse.SUCCESS, result: selectResult };

      return { result };
    } else if (order === "new") {
      const selectResult = await selectRestaurantsOrderNew(connection);

      selectResult.forEach((restaurant) => {
        restaurant.ratingAvg =
          restaurant.ratingAvg === null ? 0 : restaurant.ratingAvg;
      });
      const result = { ...baseResponse.SUCCESS, result: selectResult };

      return { result };
    } else if (order === "best") {
      const selectResult = await selectRestaurantsOrderBest(connection);

      selectResult.forEach((restaurant) => {
        restaurant.ratingAvg =
          restaurant.ratingAvg === null ? 0 : restaurant.ratingAvg;
      });

      const result = { ...baseResponse.SUCCESS, result: selectResult };

      return { result };
    } else {
      const selectResult = await selectRestaurants(connection);

      selectResult.forEach((restaurant) => {
        restaurant.ratingAvg =
          restaurant.ratingAvg === null ? 0 : restaurant.ratingAvg;
      });

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

const retrieveRestaurantById = async (restaurantId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectRestaurantById(connection, restaurantId);
    const { result: imgResult } = await retrieveRestaurantImg(restaurantId);

    const result = {
      ...baseResponse.SUCCESS,
      result: { restaurantResult: selectResult, imgResult: imgResult.result },
    };

    return { result };
  } catch (error) {
    console.log(error);

    return { error };
  } finally {
    connection.release();
  }
};

const retrieveRestaurantsByKeyword = async (keyword, order) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    if (order === "many") {
      const selectResult = await selectRestaurantsByKeywordOrderMany(
        connection,
        keyword
      );

      selectResult.forEach((restaurant) => {
        restaurant.ratingAvg =
          restaurant.ratingAvg === null ? 0 : restaurant.ratingAvg;
      });

      const result = { ...baseResponse.SUCCESS, result: selectResult };

      return { result };
    } else if (order === "best") {
      const selectResult = await selectRestaurantsByKeywordOrderBest(
        connection,
        keyword
      );

      selectResult.forEach((restaurant) => {
        restaurant.ratingAvg =
          restaurant.ratingAvg === null ? 0 : restaurant.ratingAvg;
      });

      const result = { ...baseResponse.SUCCESS, result: selectResult };

      return { result };
    } else if (order === "new") {
      const selectResult = await selectRestaurantsByKeywordOrderNew(
        connection,
        keyword
      );

      selectResult.forEach((restaurant) => {
        restaurant.ratingAvg =
          restaurant.ratingAvg === null ? 0 : restaurant.ratingAvg;
      });

      const result = { ...baseResponse.SUCCESS, result: selectResult };

      return { result };
    } else {
      const selectResult = await selectRestaurantsByKeyword(
        connection,
        keyword
      );

      selectResult.forEach((restaurant) => {
        restaurant.ratingAvg =
          restaurant.ratingAvg === null ? 0 : restaurant.ratingAvg;
      });

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

const retrieveRestaurantImg = async (restaurantId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectRestaurantImg(connection, restaurantId);

    const result = { ...baseResponse.SUCCESS, result: selectResult };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const restaurantProvider = {
  retrieveRestaurants,
  retrieveRestaurantById,
  retrieveRestaurantsByKeyword,
  retrieveRestaurantImg,
};

export default restaurantProvider;
