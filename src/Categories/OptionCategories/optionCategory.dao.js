export const insertOptionCategory = async (connection, insertParams) => {
  const insertOptionCategoryQuery = `
        insert into OptionCategories(categoryName, isRequired, menuId, restaurantId)
        values(?,?,?,?);
    `;
  const [rows] = await connection.query(
    insertOptionCategoryQuery,
    insertParams
  );

  return rows;
};

export const selectAllOptionCategories = async (connection) => {
  const query = `
        select id, categoryName, isRequired, menuId, restaurantId
        from OptionCategories;
    `;
  const [rows] = await connection.query(query);

  return rows;
};

export const selectOptionCategoriesByMenu = async (connection, menuId) => {
  const query = `
        select id, categoryName, isRequired, menuId, restaurantId
        from OptionCategories
        where menuId = ?;
    `;

  const [rows] = await connection.query(query, menuId);

  return rows;
};
