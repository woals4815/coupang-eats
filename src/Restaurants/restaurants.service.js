import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { insertRestaurant, insertRestaurantImg } from "./restaurants.dao";

const createRestaurant = async ({
  name,
  minOrderPrice,
  categoryId,
  locationId,
  delieveryFee,
}) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const insertParams = [
      name,
      minOrderPrice,
      categoryId,
      locationId,
      delieveryFee,
    ];
    const insertResult = await insertRestaurant(connection, insertParams);

    await connection.commit();

    const result = {
      ...baseResponse.CREATE_SUCCESS,
      result: `생성된 데이터 id: ${insertResult.insertId}`,
    };

    return { result };
  } catch (error) {
    console.log(error);
    await connection.rollback();
    return { error };
  } finally {
    connection.release();
  }
};

const createRestaurantImg = async ({ imgUrl, restaurantId, isForMain }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const insertParams = [imgUrl, restaurantId, isForMain];

    const insertResult = await insertRestaurantImg(connection, insertParams);

    const result = { ...baseResponse.CREATE_SUCCESS, result: insertResult };

    await connection.commit();

    return { result };
  } catch (error) {
    console.log(error);
    await connection.rollback();
    return { error };
  } finally {
    connection.release();
  }
};

const restaurantService = {
  createRestaurant,
  createRestaurantImg,
};

export default restaurantService;
