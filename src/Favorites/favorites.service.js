import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { insertFavorites, selectUserFavorites } from "./favorites.dao";
import favoriteProvider from "./favorites.provider";

const createFavorites = async ({ restaurantId, userId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const { result: selectFavoriteResult } =
      await favoriteProvider.retrieveUserFavorites(userId);

    console.log(selectFavoriteResult);

    const alreadyExist = selectFavoriteResult.result?.some(
      (favorite) => favorite.restaurantId === restaurantId
    );

    console.log(alreadyExist);
    if (alreadyExist) {
      throw baseResponse.ALREADY_FAVORITE;
    }

    const insertParams = [restaurantId, userId];

    const insertResult = await insertFavorites(connection, insertParams);

    const result = {
      ...baseResponse.CREATE_SUCCESS,
      result: `생성된 데이터 id: ${insertResult.insertId}`,
    };

    await connection.commit();

    return { result };
  } catch (error) {
    console.log(error);

    await connection.rollback();

    return { error };
  } finally {
    connection.release();
  }
};

const favoriteService = {
  createFavorites,
};

export default favoriteService;
