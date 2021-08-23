import baseResponse from "../../Config/baseResponse";
import pool from "../../Config/db";
import {
  selectAllMenus,
  selectMenuByCategory,
  selectMenuById,
  selectMenuByRestaurantId,
} from "./menus.dao";

const retrieveMenus = async ({ restaurantId, categoryId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    if (restaurantId) {
      if (categoryId) {
        const selectParams = [restaurantId, categoryId];

        const selectResult = await selectMenuByCategory(
          connection,
          selectParams
        );

        const result = { ...baseResponse.SUCCESS, result: selectResult };

        return { result };
      } else {
        const selectResult = await selectMenuByRestaurantId(
          connection,
          restaurantId
        );

        const result = { ...baseResponse.SUCCESS, result: selectResult };

        return { result };
      }
    } else {
      const selectResult = await selectAllMenus(connection);

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
const retrieveMenuById = async (menuId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectMenuById(connection, menuId);

    const result = { ...baseResponse.SUCCESS, result: selectResult };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const menuProvider = {
  retrieveMenus,
  retrieveMenuById,
};

export default menuProvider;
