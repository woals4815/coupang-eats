export const selectAllMenuCategories = async (connection) => {
  const selectAllMenuCategoriesQuery = `
    select id, categoryName, restaurantId
    from MenuCategories;
  `;

  const [rows] = await connection.query(selectAllMenuCategoriesQuery);

  return rows;
};

export const selectMenuCategoryByRestaurant = async (
  connection,
  restaurantId
) => {
  const selectMenuCategoryByRestaurantQuery = `
    select id, categoryName, restaurantId
    from MenuCategories
    where restaurantId = ?;
  `;
  const [rows] = await connection.query(
    selectMenuCategoryByRestaurantQuery,
    restaurantId
  );

  return rows;
};

export const insertMenuCategory = async (connection, insertParams) => {
  const insertMenuCategoryQuery = `
        insert into MenuCategories(categoryName, restaurantId)
        values(?,?)
    `;

  const [rows] = await connection.query(insertMenuCategoryQuery, insertParams);

  return rows;
};
