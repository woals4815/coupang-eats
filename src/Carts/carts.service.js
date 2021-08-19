import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { insertCart, insertOptionCart } from "./carts.dao";

const createCart = async ({ userId, menuId, menuCounts, payway, optionId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    //여기서 menuId를 받아온 다음, MenuOptions에서 required 인 옵션을 찾는다. 만약에 required이라면 if 문으로
    //createOptionCart를 생성해야 한다

    const insertParams = [userId, menuId, menuCounts, payway];

    const insertResult = await insertCart(connection, insertParams);

    const result = { ...baseResponse.CREATE_SUCCESS, result: insertResult };

    await connection.commit();

    return result;
  } catch (error) {
    console.log(error);
    await connection.rollback();

    return { error };
  } finally {
    connection.release();
  }
};

const createOptionCart = async ({ optionId, cartId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const insertParams = [optionId, cartId];

    const insertResult = await insertOptionCart(connection, insertParams);

    const result = { ...baseResponse.CREATE_SUCCESS, result: insertResult };

    await connection.commit();

    return result;
  } catch (error) {
    console.log(error);

    await connection.rollback();

    return { error };
  } finally {
    connection.release();
  }
};

const cartService = {
  createCart,
  createOptionCart,
};

export default cartService;
