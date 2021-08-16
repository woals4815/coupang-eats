import baseResponse from "../../Config/baseResponse";
import pool from "../../Config/db";
import { selectFoodCategories } from "./foodCategories.dao";

const retrieveFoodCategories = async () => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const categoriesResult = await selectFoodCategories(connection);

    const result = { ...baseResponse.SUCCESS, result: categoriesResult };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const foodCategoriesProvider = {
  retrieveFoodCategories,
};

export default foodCategoriesProvider;
