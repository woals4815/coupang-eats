import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import {
  selectOptionOrderByUserId,
  selectOptionOrderCompleteByUserId,
  selectOrderByUserId,
  selectOrderComplete,
} from "./orders.dao";

const retrieveOrderByUserId = async (userId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectMenuOrderResult = await selectOrderByUserId(connection, userId);
    const selectOptionOrderResult = await selectOptionOrderByUserId(
      connection,
      userId
    );
    const result = {
      ...baseResponse.SUCCESS,
      result: {
        selectMenuOrderResult,
        selectOptionOrderResult,
      },
    };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const retrieveCompleteOrder = async (userId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectOrderResult = await selectOrderComplete(connection, userId);
    const selectOptionOrderResult = await selectOptionOrderCompleteByUserId(
      connection,
      userId
    );
    const result = {
      ...baseResponse.SUCCESS,
      result: {
        selectOrderResult,
        selectOptionOrderResult,
      },
    };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const orderProvider = {
  retrieveOrderByUserId,
  retrieveCompleteOrder,
};

export default orderProvider;
