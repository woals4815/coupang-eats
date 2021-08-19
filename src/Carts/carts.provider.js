import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { selectCarts } from "./carts.dao";

const retrieveCarts = async () => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectCarts(connection);

    const result = { ...baseResponse.SUCCESS, result: selectResult };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const cartProvider = { retrieveCarts };

export default cartProvider;
