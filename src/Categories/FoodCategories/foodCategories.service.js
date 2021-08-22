import baseResponse from "../../Config/baseResponse";
import pool from "../../Config/db";
import { insertCategoryImg, insertFoodCategory } from "./foodCategories.dao";

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

const createCategoryImg = async ({ imgUrl, categoryId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const insertParams = [imgUrl, categoryId];

    const insertResult = await insertCategoryImg(connection, insertParams);

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

const foodCategoriesService = {
  createCategory,
  createCategoryImg,
};

export default foodCategoriesService;
