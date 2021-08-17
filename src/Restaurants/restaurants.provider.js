import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import {
  selectRestaurantById,
  selectRestaurants,
  selectRestaurantsByKeyword,
} from "./restaurants.dao";

const retrieveRestaurants = async () => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectRestaurants(connection);

    const result = { ...baseResponse.SUCCESS, result: selectResult };

    return { result };
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

    const result = { ...baseResponse.SUCCESS, result: selectResult };

    return { result };
  } catch (error) {
    console.log(error);

    return { error };
  } finally {
    connection.release();
  }
};

const retrieveRestaurantsByKeyword = async (keyword) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectRestaurantsByKeyword(connection, keyword);

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
};

export default restaurantProvider;
