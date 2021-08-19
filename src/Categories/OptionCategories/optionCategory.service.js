import baseResponse from "../../Config/baseResponse";
import pool from "../../Config/db";
import { insertOptionCategory } from "./optionCategory.dao";

const createOptionCategory = async ({
  categoryName,
  isRequired,
  menuId,
  restaurantId,
}) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const insertParams = [categoryName, isRequired, menuId, restaurantId];
    const insertResult = await insertOptionCategory(connection, insertParams);

    const result = { ...baseResponse.CREATE_SUCCESS, result: insertResult };

    return { result };
  } catch (error) {
    console.log(error);
    await connection.rollback();
    return { error };
  } finally {
    connection.release();
  }
};

const optionCategoryService = {
  createOptionCategory,
};

export default optionCategoryService;
