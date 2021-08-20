export const selectCarts = async (connection, userId) => {
  const selectCartsQuery = `
        select Carts.id as cartId, menuCounts, isOrdered, Carts.menuId, price, menuName,
        Carts.userId, Users.name as userName, Menu.restaurantId, Restaurants.name as restaurantName, delieveryFee, Carts.createAt, Carts.updateAt
        from Carts
        join Users
        on Users.id = Carts.userId
        join Menu
        on Menu.id = Carts.menuId
        join Restaurants
        on Restaurants.id = Menu.restaurantId
        where userId = ? and isOrdered=0;
    `;
  const [rows] = await connection.query(selectCartsQuery, userId);

  return rows;
};

export const insertCart = async (connection, insertParams) => {
  const insertCartQuery = `
        insert into Carts(userId, menuId, menuCounts)
        values(?,?,?);
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

export const selectOptionCarts = async (connection, userId) => {
  const selectOptionCartsQuery = `
    select OptionCarts.id as optionCartId, optionId, optionName, cartId, MenuOptions.price, OptionCarts.createAt, OptionCarts.updateAt
    from OptionCarts
    join MenuOptions
    on MenuOptions.id = OptionCarts.optionId
    join Carts
    on Carts.id = OptionCarts.cartId
    where userId = ? and isOrdered=0;
  `;

  const [rows] = await connection.query(selectOptionCartsQuery, userId);

  return rows;
};
