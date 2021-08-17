import baseResponse from "../../Config/baseResponse";
import pool from "../../Config/db";
import { insertMenu } from "./menus.dao";

const createMenu = async ({ categoryId, menuName, restaurantId, price }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const insertParams = [categoryId, menuName, restaurantId, price];
    const insertResult = await insertMenu(connection, insertParams);

    await connection.commit();
    const result = {
      ...baseResponse.CREATE_SUCCESS,
      result: `생성된 데이터 id: ${insertResult.insertId}`,
    };

    return result;
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const menuService = {
  createMenu,
};

export default menuService;
