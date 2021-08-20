export const insertOrder = async (connection, insertParams) => {
  const insertOrderQuery = `
    insert into Orders(cartId, userId)
    values(?,?);
  `;

  const [rows] = await connection.query(insertOrderQuery, insertParams);

  return rows;
};
