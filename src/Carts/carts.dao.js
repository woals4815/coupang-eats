export const selectCarts = async (connection) => {
  const selectCartsQuery = `
        select id as cartId, menuCounts, isOrdered, payway, createAt, updateAt,
        from Carts
        join OptionCarts
        on OptionCarts.cartId = Carts.id
        join MenuOptions
        on OptionCarts.optionId = MenuOptions.id
    `;
  const [rows] = await connection.query(selectCartsQuery);

  return rows;
};

export const insertCart = async (connection, insertParams) => {
  const insertCartQuery = `
        insert into Carts(userId, menuId, menuCounts, payway)
        values(?,?,?,?,?);
    `;
  const [rows] = await connection.query(insertCartQuery, insertParams);

  return rows;
};

export const insertOptionCart = async (connection, insertParams) => {
  const insertOptionCartQuery = `
        insert into OptionCarts(optionId, cartId)
        values(?, ?);
    `;
  const [rows] = await connection.query(insertOptionCartQuery, insertParams);

  return rows;
};
