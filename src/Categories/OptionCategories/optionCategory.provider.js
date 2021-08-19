import baseResponse from "../../Config/baseResponse";
import pool from "../../Config/db";
import {
  insertOptionCategory,
  selectAllOptionCategories,
  selectOptionCategoriesByMenu,
} from "./optionCategory.dao";

const retrieveOptionCategories = async ({ menuId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    if (menuId) {
      const selectResult = await selectOptionCategoriesByMenu(
        connection,
        menuId
      );

      const result = { ...baseResponse.SUCCESS, result: selectResult };

      return { result };
    } else {
      const selectResult = await selectAllOptionCategories(connection);

      const result = { ...baseResponse.SUCCESS, result: selectResult };

      return { result };
    }
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const optionCategoryProvider = {
  retrieveOptionCategories,
};

export default optionCategoryProvider;
