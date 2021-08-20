import cartService from "../Carts/carts.service";
import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { insertOrder } from "./orders.dao";

const createOrder = async ({ cartId, userId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const insertParams = [cartId, userId];

    const insertResult = await insertOrder(connection, insertParams);
    const { result, error } = await cartService.editCartOrdered({
      userId,
      cartId,
    });
    if (error) {
      throw error;
    }

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

const orderService = {
  createOrder,
};

export default orderService;
