import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insertUser, selectUserByEmail } from "./users.dao";
import pool from "../Config/db";
import userProvider from "./users.provider";
import baseResponse from "../Config/baseResponse";

const createUser = async ({ email, password, name, phoneNumber }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const saltRound = Number(process.env.SALT_ROUND);

    const { result: userResult, error } =
      await userProvider.retrieveUserByEmail(email);
    if (error) {
      throw DB_ERROR;
    }
    if (userResult?.length > 0) {
      throw baseResponse.SIGNUP_REDUNDANT_EMAIL;
    }
    //비번 해쉬
    const hashedPassword = await bcrypt.hash(password, saltRound);
    //inserUser dao 인자
    const insertParams = [name, email, hashedPassword, phoneNumber];
    //insert 결과
    const insertResult = await insertUser(connection, insertParams);

    await connection.commit();
    const result = { ...baseResponse.SUCCESS, result: insertResult.insertId };

    return { result };
  } catch (error) {
    console.log(error);
    await connection.rollback();
    return { error };
  } finally {
    connection.release();
  }
};

const loginUser = async ({ email, password }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const [user] = await selectUserByEmail(connection, email);
    if (!user) {
      throw baseResponse.USER_USEREMAIL_NOT_EXIST;
    }
    const ok = await bcrypt.compare(password, user.password);
    let token = "";
    if (ok) {
      const payload = { userId: user.id };
      token = jwt.sign(payload, process.env.JWT_SECRET);
      const result = { ...baseResponse.LOGIN_SUCCESS, result: { token } };
      return { result };
    } else {
      throw baseResponse.SIGNIN_PASSWORD_WRONG;
    }
  } catch (error) {
    console.log(error);
    return { error };
  } finally {
    connection.release();
  }
};

const userService = {
  createUser,
  loginUser,
};

export default userService;
