import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { selectUserFavorites } from "./favorites.dao";

const retrieveUserFavorites = async (userId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectUserFavorites(connection, userId);

    const result = { ...baseResponse.SUCCESS, result: selectResult };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const favoriteProvider = {
  retrieveUserFavorites,
};

export default favoriteProvider;
