import optionCategoryProvider from "../Categories/OptionCategories/optionCategory.provider";
import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { insertCart, insertOptionCart } from "./carts.dao";

const createCart = async ({ userId, menuId, menuCounts, optionId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    //여기서 menuId를 받아온 다음, MenuOptions에서 required 인 옵션을 찾는다. 만약에 required이라면 if 문으로
    //createOptionCart를 생성해야 한다
    const { result: optionCategoryResult } =
      await optionCategoryProvider.retrieveOptionCategories({
        menuId,
      });
    const isRequired = optionCategoryResult.result?.some(
      (optionCategory) => optionCategory.isRequired
    );

    if (isRequired) {
      if (!optionId) {
        throw baseResponse.OPTION_ID_EMPTY;
      }
      const cartInsertParams = [userId, menuId, menuCounts];
      const cartInsertResult = await insertCart(connection, cartInsertParams);
      const optionCartInsertParams = [optionId, cartInsertResult.insertId];
      const optionCartInsertResult = await insertOptionCart(
        connection,
        optionCartInsertParams
      );

      const result = {
        ...baseResponse.CREATE_SUCCESS,
        result: {
          cartResult: `생성된 카트 id: ${cartInsertResult.insertId}`,
          optionCartResult: `생성된 옵션 카트 id: ${optionCartInsertResult.insertId}`,
        },
      };

      await connection.commit();

      return { result };
    } else {
      const cartInsertParams = [userId, menuId, menuCounts];
      const cartInsertResult = await insertCart(connection, cartInsertParams);

      const result = {
        ...baseResponse.CREATE_SUCCESS,
        result: `생성된 데이터 id: ${cartInsertResult.insertId}`,
      };

      await connection.commit();

      return { result };
    }
  } catch (error) {
    console.log(error);
    await connection.rollback();

    return { error };
  } finally {
    connection.release();
  }
};

const createOptionCart = async ({ optionId, cartId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const insertParams = [optionId, cartId];

    const insertResult = await insertOptionCart(connection, insertParams);

    const result = { ...baseResponse.CREATE_SUCCESS, result: insertResult };

    await connection.commit();

    return result;
  } catch (error) {
    console.log(error);

    await connection.rollback();

    return { error };
  } finally {
    connection.release();
  }
};

const cartService = {
  createCart,
  createOptionCart,
};

export default cartService;
