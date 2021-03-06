import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import orderProvider from "../Orders/orders.provider";
import { insertReview, insertReviewLikes } from "./reviews.dao";

const createReview = async ({ userId, review, restaurantId, rating }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    //주문 테이블 확인 후 주문했던 유저가 맞는 지 확인
    const { result: orderResult, error } =
      await orderProvider.retrieveOrderByUserId(userId);
    if (error) {
      throw error;
    }
    const didOrder = orderResult.result.selectMenuOrderResult?.some(
      (order) => order.userId === userId
    );
    // 주문한 유저가 아니라면 에러 처리
    if (!didOrder) {
      throw baseResponse.NOT_ORDER;
    }

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

    return { error };
  } finally {
    connection.release();
  }
};

const createReviewLike = async ({ reviewId, isHelp, userId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const insertParams = [reviewId, isHelp, userId];

    const insertResult = await insertReviewLikes(connection, insertParams);

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

const reviewService = {
  createReview,
  createReviewLike,
};

export default reviewService;
