import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { insertRestaurant } from "./restaurants.dao";

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

const restaurantService = {
  createRestaurant,
};

export default restaurantService;
