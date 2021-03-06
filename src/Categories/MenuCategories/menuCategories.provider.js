import baseResponse from "../../Config/baseResponse";
import pool from "../../Config/db";
import {
  selectAllMenuCategories,
  selectMenuCategoryByRestaurant,
} from "./menuCategories.dao";

const getMenuCategoryByRestaurantId = async (query) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const { restaurantId } = query;
  try {
    if (restaurantId) {
      const selectResult = await selectMenuCategoryByRestaurant(
        connection,
        restaurantId
      );
      const result = { ...baseResponse.SUCCESS, result: selectResult };
      return { result };
    } else {
      const selectResult = await selectAllMenuCategories(connection);

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

const menuCategoriesProvider = {
  getMenuCategoryByRestaurantId,
};

export default menuCategoriesProvider;
