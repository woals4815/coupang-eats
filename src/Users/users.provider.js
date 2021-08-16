import baseResponse from "../Config/baseResponse";
import pool from "../Config/db";
import { selectUserByEmail, selectUserById, selectUsers } from "./users.dao";

const retrieveUsers = async () => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectUsers(connection);

    const result = { ...baseResponse.SUCCESS, result: selectResult };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const retrieveUserByEmail = async (email) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const result = await selectUserByEmail(connection, email);

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const retrieveUserById = async (userId) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const selectResult = await selectUserById(connection, userId);

    const result = { ...baseResponse.SUCCESS, result: selectResult };

    return { result };
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const userProvider = {
  retrieveUserByEmail,
  retrieveUsers,
  retrieveUserById,
};

export default userProvider;
