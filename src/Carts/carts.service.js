import optionCategoryProvider from "../Categories/OptionCategories/optionCategory.provider";
import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import menuProvider from "../Restaurants/Menus/menus.provider";
import { insertCart, insertOptionCart, updateCartOrdered } from "./carts.dao";
import cartProvider from "./carts.provider";

const createCart = async ({ userId, menuId, menuCounts, optionId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const { result: alreadyExistCart } = await cartProvider.retrieveCarts(
      userId
    );
    const { result: menuResult } = await menuProvider.retrieveMenuById(menuId);

    const restaurantId = menuResult.result.selectMenuResult[0].restaurantId;

    //이미 카트에 담겨있는 메뉴들의 식당 id가 지금 받은 menuId로 가져온 메뉴 id로 검색한 식당 id랑 다르면 throw error 해야 한다
    const isDifferent = alreadyExistCart?.result?.carts?.some(
      (item) => item.restaurantId !== restaurantId
    );
    //식당 id와 다를 때 throw error
    if (isDifferent) {
      throw baseResponse.DIFFERENT_RESTAURANT;
    }
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
          cartResult: cartInsertResult.insertId,
          optionCartResult: optionCartInsertResult.insertId,
        },
      };

      await connection.commit();

      return { result };
    } else {
      const cartInsertParams = [userId, menuId, menuCounts];
      const cartInsertResult = await insertCart(connection, cartInsertParams);

      const result = {
        ...baseResponse.CREATE_SUCCESS,
        result: cartInsertResult.insertId,
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

const createOptionCart = async ({ optionId, cartId, userId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    if (!userId) {
      throw baseResponse.NO_USER_ID;
    }
    const insertParams = [optionId, cartId];

    const insertResult = await insertOptionCart(connection, insertParams);
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

const editCartOrdered = async ({ cartId, userId }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const updateParams = [cartId, userId];
    const updateResult = await updateCartOrdered(connection, updateParams);

    const result = {
      ...baseResponse.UPDATE_SUCCEES,
      result: `업데이트 된 데이터 id: ${cartId}`,
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

const cartService = {
  createCart,
  createOptionCart,
  editCartOrdered,
};

export default cartService;
