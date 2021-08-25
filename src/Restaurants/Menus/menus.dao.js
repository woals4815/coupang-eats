//메뉴 전체 조회 할 때(이미지는 대표 이미지 하나만 조회)
export const selectAllMenus = async (connection) => {
  const selectAllMenusQuery = `
        select Menu.id, menuName, Menu.restaurantId, price, Menu.categoryId,
        categoryName, name, description, imgUrl
        from Menu
        join Restaurants
        on Restaurants.id = Menu.restaurantId
        join MenuCategories
        on MenuCategories.id = Menu.categoryId
        left join MenuImages
        on MenuImages.menuId = Menu.id
        group by Menu.id;
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
  console.log(rows);
  return rows;
};
//특정 메뉴 id로 조회할 때 쿼리(이미지는 셀렉 안함 따로 모든 이미지를 가져와서 줌)
export const selectMenuById = async (connection, menuId) => {
  const selectMenuByIdQuery = `
    select Menu.id, menuName, Menu.restaurantId, price, name, description
    from Menu
    join Restaurants
    on Restaurants.id = Menu.restaurantId
    join MenuCategories
    where Menu.id = ?
    group by Menu.id;
  `;
  const [rows] = await connection.query(selectMenuByIdQuery, menuId);

  return rows;
};

export const selectMenuImg = async (connection, menuId) => {
  const selectMenuImgQuery = `
    select id, menuId, imgUrl
    from MenuImages
    where menuId=?;
  `;
  const [rows] = await connection.query(selectMenuImgQuery, menuId);

  return rows;
};

export const selectMenuByRestaurantId = async (connection, restaurantId) => {
  const selectMenuByRestaurantIdQuery = `
    select Menu.id, menuName, Menu.restaurantId, price, name as restaurantName,
    MenuCategories.categoryName as menuCategoryName, description, imgUrl
    from Menu
    join Restaurants
    on Restaurants.id = Menu.restaurantId
    join MenuCategories
    on MenuCategories.id = Menu.categoryId
    left join MenuImages
    on MenuImages.menuId = Menu.id
    where Menu.restaurantId=?
    group by Menu.id;
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
    Menu.categoryId, price, description, imgUrl
    from Menu
    join MenuCategories
    on MenuCategories.id = Menu.categoryId
    join Restaurants
    on Restaurants.id = Menu.restaurantId
    left join MenuImages
    on MenuImages.menuId = Menu.id
    where Menu.restaurantId =? and Menu.categoryId=?
    group by Menu.id;
  `;
  const [rows] = await connection.query(
    selectMenuByCategoryQuery,
    selectParams
  );

  return rows;
};
//이미지 등록
export const insertMenuImg = async (connection, insertParams) => {
  const insertMenuImgQuery = `
    insert into MenuImages(menuId, imgUrl)
    values(?,?);
  `;
  const [rows] = await connection.query(insertMenuImgQuery, insertParams);

  return rows;
};
