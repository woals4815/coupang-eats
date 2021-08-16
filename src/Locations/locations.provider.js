import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import {
  selectRestaurantLocationById,
  selectRestaurantLocations,
  selectUserLocations,
} from "./locations.dao";

const retrieveRestaurantLocations = async () => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectRestaurantLocations(connection);

    const result = { ...baseResponse.SUCCESS, result: selectResult };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const retrieveUserLocations = async () => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectUserLocations(connection);

    const result = { ...baseResponse.SUCCESS, result: selectResult };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const retrieveRestaurantLocationById = async (restaurantId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectRestaurantLocationById(
      connection,
      restaurantId
    );

    const result = { ...baseResponse.SUCCESS, result: selectResult };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const retrieveUserLocationById = async (userId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectRestaurantLocations(connection, userId);

    const result = { ...baseResponse.SUCCESS, result: selectResult };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const locationProvider = {
  retrieveRestaurantLocations,
  retrieveUserLocations,
  retrieveRestaurantLocationById,
  retrieveUserLocationById,
};

export default locationProvider;
