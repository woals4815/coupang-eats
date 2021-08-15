import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insertUser, selectUserByEmail } from "./users.dao";
import pool from "../Config/db";
import userProvider from "./users.provider";

const createUser = async ({ email, password, name, phoneNumber }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const saltRound = Number(process.env.SALT_ROUND);

    const { result: userResult, error } =
      await userProvider.retrieveUserByEmail(email);
    if (error) {
      throw error;
    }
    if (userResult?.length > 0) {
      throw "이미 존재하는 이메일입니다.";
    }
    //비번 해쉬
    const hashedPassword = await bcrypt.hash(password, saltRound);
    //inserUser dao 인자
    const insertParams = [name, email, hashedPassword, phoneNumber];
    //insert 결과
    const result = await insertUser(connection, insertParams);

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

const loginUser = async ({ email, password }) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const [user] = await selectUserByEmail(connection, email);
    if (!user) {
      throw "존재하지 않은 ID/Email 입니다.";
    }
    const ok = await bcrypt.compare(password, user.password);
    let token = "";
    if (ok) {
      const payload = { userId: user.id };
      token = jwt.sign(payload, process.env.JWT_SECRET);
      return { result: token };
    } else {
      throw "비밀번호를 정확히 입력해주세요.";
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
