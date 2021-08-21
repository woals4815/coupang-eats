import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { insertReview } from "./reviews.dao";

const createReview = async ({ userId, review, restaurantId, rating }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const insertParams = [userId, review, restaurantId, rating];

    const insertResult = await insertReview(connection, insertParams);

    const result = {
      ...baseResponse.CREATE_SUCCESS,
      result: {
        insertId: insertResult.insertId,
      },
    };

    await connection.commit();

    return { result };
  } catch (error) {
    console.log(error);
    await connection.rollback();
  } finally {
    connection.release();
  }
};

const reviewService = {
  createReview,
};

export default reviewService;
