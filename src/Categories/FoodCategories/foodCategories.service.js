import baseResponse from "../../Config/baseResponse";
import pool from "../../Config/db";
import { insertFoodCategory } from "./foodCategories.dao";

//카테고리 생성 서비스
const createCategory = async (categoryName) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const insertResult = await insertFoodCategory(connection, categoryName);

    await connection.commit();

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

const foodCategoriesService = {
  createCategory,
};

export default foodCategoriesService;
