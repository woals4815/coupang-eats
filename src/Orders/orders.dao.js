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
        select Orders.id, isComplete, Orders.userId, Orders.createAt,
        menuCounts, isOrdered, Menu.price as menuPrice, Menu.menuName,
        Carts.id as cartId, Menu.restaurantId
        from Orders
        join Carts
        on Carts.id = Orders.cartId
        join Users
        on Users.id = Orders.userId
        join Menu
        on Menu.id = Carts.menuId
        join Restaurants
        on Restaurants.id = Menu.restaurantId
        where Orders.userId = ? and isComplete=0;
    `;
  const [rows] = await connection.query(query, userId);

  return rows;
};

export const selectOptionOrderByUserId = async (connection, userId) => {
  const selectOptionOrderByUserIdQuery = `
        select optionName, MenuOptions.price, OptionCarts.cartId
        from OptionCarts
        join Orders
        on OptionCarts.cartId = Orders.cartId
        join MenuOptions
        on MenuOptions.id = OptionCarts.optionId
        where Orders.userId = ? and Orders.isComplete=0;
    `;
  const [rows] = await connection.query(selectOptionOrderByUserIdQuery, userId);

  return rows;
};

export const updateOrderComplete = async (connection, orderId) => {
  const updateOrderCompleteQuery = `
        update Orders
        set isComplete = 1
        where id = ?;
    `;
  const [rows] = await connection.query(updateOrderCompleteQuery, orderId);

  return rows;
};

export const selectOrderComplete = async (connection, userId) => {
  const selectOrderCompleteQuery = `
        select Orders.id, isComplete, Orders.userId, Orders.createAt,
        menuCounts, isOrdered, Menu.price as menuPrice, Menu.menuName,
        Carts.id as cartId, Menu.restaurantId
        from Orders
        join Users
        on Users.id = Orders.userId
        join Carts
        on Carts.id = Orders.cartId
        join Menu
        on Menu.id = Carts.menuId
        where Orders.userId = ? and isComplete=1; 
    `;
  const [rows] = await connection.query(selectOrderCompleteQuery, userId);

  return rows;
};

export const selectOptionOrderCompleteByUserId = async (connection, userId) => {
  const selectOptionOrderByUserIdQuery = `
          select optionName, MenuOptions.price, OptionCarts.cartId
          from OptionCarts
          join Orders
          on OptionCarts.cartId = Orders.cartId
          join MenuOptions
          on MenuOptions.id = OptionCarts.optionId
          where Orders.userId = ? and Orders.isComplete=1;
      `;
  const [rows] = await connection.query(selectOptionOrderByUserIdQuery, userId);

  return rows;
};
