import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { selectOrderByUserId } from "./orders.dao";

const retrieveOrderByUserId = async (userId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectOrderByUserId(connection, userId);

    const result = { ...baseResponse.SUCCESS, result: selectResult };

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
};

export default orderProvider;
