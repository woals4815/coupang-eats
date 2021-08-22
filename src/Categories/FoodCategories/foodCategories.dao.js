//음식 카테고리 전체 조회 접근
export const selectFoodCategories = async (connection) => {
  const selectFoodCategoriesQuery = `
          select Categories.id, categoryName, imgUrl
          from Categories
          left join CategoryImages
          on CategoryImages.categoryId = Categories.id;
      `;
  const [rows] = await connection.query(selectFoodCategoriesQuery);
  return rows;
};
//특정 카테고리 id로 카테고리 조회 접근
export const selectFoodCategoryById = async (connection, categoryId) => {
  const selectFoodCategoryByIdQuery = `
          select id, categoryName
          from Categories
          where id = ?;
      `;
  const [rows] = await connection.query(
    selectFoodCategoryByIdQuery,
    categoryId
  );

  return rows;
};
//카테고리 생성 접근
export const insertFoodCategory = async (connection, categoryName) => {
  const insertFoodCategoryQuery = `
          insert Categories(categoryName) values(?)
      `;
  const [rows] = await connection.query(insertFoodCategoryQuery, categoryName);

  return rows;
};

export const insertCategoryImg = async (connection, insertParams) => {
  const insertCategoryImgQuery = `
    insert into CategoryImages(imgUrl, categoryId)
    values(?,?);
  `;

  const [rows] = await connection.query(insertCategoryImgQuery, insertParams);

  return rows;
};
