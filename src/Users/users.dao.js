export const selectUsers = async (connection) => {
  const selectUsersQuery = `
        select id, email, name, phoneNumber, createAt, updateAt
        from Users;
      `;
  const [rows] = await connection.query(selectUsersQuery);

  return rows;
};

export const selectUserById = async (connection, userId) => {
  const selectUserByIdQuery = `
        select id, email, name, phoneNumber, createAt, updateAt
        from Users
        where id=?;
      `;
  const [rows] = await connection.query(selectUserByIdQuery, userId);

  return rows;
};

export const insertUser = async (connection, params) => {
  const insertUserQuery = `
        insert Users(name, email, password, phoneNumber) values(?,?,?,?);
    `;
  const [rows] = await connection.query(insertUserQuery, params);

  return rows;
};
//email 중복 확인용
export const selectUserByEmail = async (connection, email) => {
  const selectUserByEmailQuery = `
        select id, password
        from Users
        where email=?;
    `;
  const [rows] = await connection.query(selectUserByEmailQuery, email);

  return rows;
};
export const selectUserPassword = async (connection, params) => {
  const selectUserPasswordQuery = `
        select id, password
        from Users
        where email=? and password = ?;
    `;
  const [rows] = await connection.query(selectUserPasswordQuery, params);

  return rows;
};
