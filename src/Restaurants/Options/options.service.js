import baseResponse from "../../Config/baseResponse";
import pool from "../../Config/db";
import { insertOption } from "./options.dao";

const createOption = async ({
  optionName,
  price,
  categoryId,
  menuId,
  isRequired,
}) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const insertParams = [optionName, price, categoryId, menuId, isRequired];

    const insertResult = await insertOption(connection, insertParams);

    const result = { ...baseResponse.CREATE_SUCCESS, result: insertResult };

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

const optionService = {
  createOption,
};

export default optionService;
