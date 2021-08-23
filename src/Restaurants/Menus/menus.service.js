import baseResponse from "../../Config/baseResponse";
import pool from "../../Config/db";
import { insertMenu, insertMenuImg } from "./menus.dao";

const createMenu = async ({ categoryId, menuName, restaurantId, price }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const insertParams = [categoryId, menuName, restaurantId, price];
    const insertResult = await insertMenu(connection, insertParams);

    console.log(insertResult);

    const result = {
      ...baseResponse.CREATE_SUCCESS,
      result: `생성된 데이터 id: ${insertResult.insertId}`,
    };

    await connection.commit();
    return { result };
  } catch (error) {
    console.log(error);

    connection.rollback();

    return { error };
  } finally {
    connection.release();
  }
};

const createMenuImg = async ({ menuId, location }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const insertParams = [menuId, location];
    const insertResult = await insertMenuImg(connection, insertParams);

    const result = { ...baseResponse.CREATE_SUCCESS, result: insertResult };

    return { result };
  } catch (error) {
    console.log(error);

    connection.rollback();

    return { error };
  } finally {
    connection.release();
  }
};

const menuService = {
  createMenu,
  createMenuImg,
};

export default menuService;
