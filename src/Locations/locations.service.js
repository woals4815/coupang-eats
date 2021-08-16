import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { insertRestaurantLocation, insertUserLocation } from "./locations.dao";

const createRestaurantLocation = async ({ latitude, longitude }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const insertParams = [latitude, longitude];
    const insertResult = await insertRestaurantLocation(
      connection,
      insertParams
    );

    await connection.commit();
    const result = {
      ...baseResponse.CREATE_SUCCESS,
      result: `생성된 데이터 id: ${insertResult.insertId}`,
    };
    return { result };
  } catch (error) {
    console.log(error);
    await connection.rollback();
  } finally {
    connection.release();
  }
};

const createUserLocation = async ({
  latitude,
  longitude,
  category,
  userId,
}) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const insertParams = [latitude, longitude, category, userId];
    const insertResult = await insertUserLocation(connection, insertParams);

    await connection.commit();
    const result = {
      ...baseResponse.CREATE_SUCCESS,
      result: `생성된 데이터 id: ${insertResult.insertId}`,
    };
    return { result };
  } catch (error) {
    console.log(error);
    await connection.rollback();
  } finally {
    connection.release();
  }
};

const locationService = {
  createRestaurantLocation,
  createUserLocation,
};

export default locationService;
