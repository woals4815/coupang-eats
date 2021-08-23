export const selectAllMenus = async (connection) => {
  const selectAllMenusQuery = `
        select Menu.id, menuName, Menu.restaurantId, price, Menu.categoryId
        categoryName, name
        from Menu
        join Restaurants
        on Restaurants.id = Menu.restaurantId
        join MenuCategories
        on MenuCategories.id = Menu.categoryId
    `;
  const [rows] = await connection.query(selectAllMenusQuery);

  return rows;
};

export const insertMenu = async (connection, insertParams) => {
  const insertMenuQuery = `
        insert into Menu(categoryId, menuName, restaurantId, price)
        values(?,?,?,?)
    `;

  const [rows] = await connection.query(insertMenuQuery, insertParams);

  return rows;
};

export const selectMenuById = async (connection, menuId) => {
  const selectMenuByIdQuery = `
    select Menu.id, menuName, Menu.restaurantId, price, name
    from Menu
    join Restaurants
    on Restaurants.id = Menu.restaurantId
    join MenuCategories
    where Menu.id = ?
  `;
  const [rows] = await connection.query(selectMenuByIdQuery, menuId);

  return rows;
};

export const selectMenuByRestaurantId = async (connection, restaurantId) => {
  const selectMenuByRestaurantIdQuery = `
    select Menu.id, menuName, Menu.restaurantId, price, name as restaurantName,
    MenuCategories.categoryName as menuCategoryName
    from Menu
    join Restaurants
    on Restaurants.id = Menu.restaurantId
    join MenuCategories
    where Menu.restaurantId=?;
  `;

  const [rows] = await connection.query(
    selectMenuByRestaurantIdQuery,
    restaurantId
  );

  return rows;
};

export const selectMenuByCategory = async (connection, selectParams) => {
  const selectMenuByCategoryQuery = `
    select Menu.id, menuName, Menu.restaurantId, MenuCategories.categoryName as menuCategoryName,
    Menu.categoryId, price
    from Menu
    join MenuCategories
    on MenuCategories.id = Menu.categoryId
    join Restaurants
    on Restaurants.id = Menu.restaurantId
    where Menu.restaurantId =? and Menu.categoryId=?
  `;
  const [rows] = await connection.query(
    selectMenuByCategoryQuery,
    selectParams
  );

  return rows;
};
