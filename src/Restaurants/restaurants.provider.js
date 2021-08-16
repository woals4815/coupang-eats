import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { selectRestaurantById, selectRestaurants } from "./restaurants.dao";

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

const restaurantProvider = {
  retrieveRestaurants,
  retrieveRestaurantById,
};

export default restaurantProvider;
