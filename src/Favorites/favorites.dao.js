export const insertFavorites = async (connection, insertParams) => {
  const insertFavoritesQuery = `
        insert into UserFavorites(restaurantId, userId)
        values(?,?);
    `;
  const [rows] = await connection.query(insertFavoritesQuery, insertParams);

  return rows;
};

export const selectUserFavorites = async (connection, userId) => {
  const selectUserFavoritesQuery = `
      select UserFavorites.restaurantId, name, imgUrl, UserFavorites.userId
      from UserFavorites
      join Restaurants
      on Restaurants.id = UserFavorites.restaurantId
      join RestaurantImages
      on RestaurantImages.restaurantId = UserFavorites.restaurantId
      where UserFavorites.userId = ?;
  `;
  const [rows] = await connection.query(selectUserFavoritesQuery, userId);

  return rows;
};
