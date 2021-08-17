const insertMenuCategory = async (connection, insertParams) => {
  const insertMenuCategoryQuery = `
        insert into MenuCategories(categoryName, restaurantId)
        values(?,?)
    `;

  const [rows] = await connection.query(insertMenuCategoryQuery, insertParams);

  return rows;
};
