import pool from "../Config/db";
import { selectUserByEmail, selectUsers } from "./users.dao";

const retrieveUsers = async () => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const result = await selectUsers(connection);
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

const userProvider = {
  retrieveUserByEmail,
  retrieveUsers,
};

export default userProvider;
