export const insertOption = async (connection, insertParams) => {
  const insertOptionQuery = `
        insert into MenuOptions(optionName, price, categoryId, menuId, isRequired)
        values(?,?,?,?,?);
    `;

  const [rows] = await connection.query(insertOptionQuery, insertParams);

  return rows;
};

export const selectOptions = async (connection) => {
  const selectOptionsQuery = `
    select MenuOptions.id, optionName, MenuOptions.price, MenuOptions.categoryId, 
    MenuOptions.menuId, MenuOptions.isRequired, categoryName, menuName
    from MenuOptions
    join OptionCategories
    on OptionCategories.id = MenuOptions.categoryId
    join Menu
    on Menu.id = OptionCategories.menuId
    join Restaurants
    on Restaurants.id = OptionCategories.restaurantId;
  `;
  const [rows] = await connection.query(selectOptionsQuery);

  return rows;
};

export const selectOptionsByMenuAndCategory = async (
  connection,
  selectParams
) => {
  const query = `
    select MenuOptions.id, optionName, MenuOptions.price, MenuOptions.categoryId, 
    MenuOptions.menuId, MenuOptions.isRequired, categoryName, menuName
    from MenuOptions
    join OptionCategories
    on OptionCategories.id = MenuOptions.categoryId
    join Menu
    on Menu.id = OptionCategories.menuId
    join Restaurants
    on Restaurants.id = OptionCategories.restaurantId
    where OptionCategories.id = ? and OptionCategories.menuId = ?;
  `;

  const [rows] = await connection.query(query, selectParams);

  return rows;
};
