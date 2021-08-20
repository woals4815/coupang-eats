import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { selectCarts, selectOptionCarts } from "./carts.dao";

const retrieveCarts = async (userId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectCartResult = await selectCarts(connection, userId);
    const selectOptionCartResult = await selectOptionCarts(connection, userId);
    const totalResult = {
      carts: selectCartResult,
      optionCarts: selectOptionCartResult,
    };
    const result = { ...baseResponse.SUCCESS, result: totalResult };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const retrieveOptionCarts = async (userId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectOptionCarts(connection, userId);

    const result = { ...baseResponse.SUCCESS, result: selectResult };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const cartProvider = { retrieveCarts, retrieveOptionCarts };

export default cartProvider;
