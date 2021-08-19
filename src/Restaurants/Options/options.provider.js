import baseResponse from "../../Config/baseResponse";
import pool from "../../Config/db";
import { selectOptions, selectOptionsByMenuAndCategory } from "./options.dao";

const retrieveOptions = async (query) => {
  const { menuId, categoryId } = query;
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    if (categoryId && menuId) {
      const selectParams = [categoryId, menuId];

      const selectResult = await selectOptionsByMenuAndCategory(
        connection,
        selectParams
      );
      const result = { ...baseResponse.SUCCESS, result: selectResult };

      return { result };
    } else {
      const selectResult = await selectOptions(connection);

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

const optionProvider = {
  retrieveOptions,
};

export default optionProvider;
