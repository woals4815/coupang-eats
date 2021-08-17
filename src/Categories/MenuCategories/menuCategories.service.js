import baseResponse from "../../Config/baseResponse";
import pool from "../../Config/db";
import { insertMenuCategory } from "./menuCategories.dao";

const createMenuCategory = async ({ categoryName, restaurantId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const insertParams = [categoryName, restaurantId];
    const insertResult = await insertMenuCategory(connection, insertParams);
    await connection.commit();

    const result = {
      ...baseResponse.CREATE_SUCCESS,
      result: `생성된 데이터 id: ${insertResult.insertId}`,
    };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const menuCategoryService = {
  createMenuCategory,
};

export default menuCategoryService;
