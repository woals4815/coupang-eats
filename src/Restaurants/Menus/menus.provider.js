import baseResponse from "../../Config/baseResponse";
import pool from "../../Config/db";
import { selectAllMenus } from "./menus.dao";

const retrieveMenus = async (query) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    if (!query) {
      const selectResult = await selectAllMenus(connection);

      const result = { ...baseResponse.SUCCESS, selectResult };

      return { result };
    } else {
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const menuProvider = {
  retrieveMenus,
};

export default menuProvider;
