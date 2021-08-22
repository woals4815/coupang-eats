import { updateCartOrdered } from "../Carts/carts.dao";
import cartService from "../Carts/carts.service";
import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { insertOrder, updateOrderComplete } from "./orders.dao";

//주문 생성 함수
const createOrder = async ({ cartId, userId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const insertParams = [cartId, userId];

    const insertResult = await insertOrder(connection, insertParams);

    const updateResult = await updateCartOrdered(connection, insertParams);

    const result = {
      ...baseResponse.CREATE_SUCCESS,
      result: `생성된 데이터 id: ${insertResult.insertId}`,
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

const editOrderComplete = async (orderId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const updateResult = await updateOrderComplete(connection, orderId);

    const result = { ...baseResponse.UPDATE_SUCCEES, result: updateResult };

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

const orderService = {
  createOrder,
  editOrderComplete,
};

export default orderService;
