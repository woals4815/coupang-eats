export const insertOrder = async (connection, insertParams) => {
  const insertOrderQuery = `
    insert into Orders(cartId, userId)
    values(?,?);
  `;

  const [rows] = await connection.query(insertOrderQuery, insertParams);

  return rows;
};

export const selectOrderByUserId = async (connection, userId) => {
  const query = `
        select Orders.id, isComplete, Orders.userId, Orders.createAt
        from Orders
        join Users
        on Users.id = Orders.userId
        where Orders.userId = ?;
    `;

  const [rows] = await connection.query(query, userId);

  return rows;
};
