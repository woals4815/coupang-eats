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
