export const selectRestaurants = async (connection) => {
  const selectRestaurantsQuery = `
        select Restaurants.id, name, minOrderPrice, delieveryFee, categoryName,
        latitude, longitude
        from Restaurants
        join Categories
        on Categories.id = Restaurants.categoryId
        join RestaurantLocations
        on RestaurantLocations.id = Restaurants.locationId;
    `;
  const [rows] = await connection.query(selectRestaurantsQuery);

  return rows;
};

export const selectRestaurantById = async (connection, restaurantId) => {
  const selectRestaurantByIdQuery = `
        select Restaurants.id, name, minOrderPrice, delieveryFee, categoryName
        latitude, longitude
        from Restaurants
        join Categories
        on Categories.id = Restaurants.categoryId
        join RestaurantLocations
        on RestaurantLocations.id = Restaurants.locationId
        where Restaurants.id = ?
    `;
  const [rows] = await connection.query(
    selectRestaurantByIdQuery,
    restaurantId
  );

  return rows;
};

export const insertRestaurant = async (connection, insertParams) => {
  const insertRestaurantQuery = `
        insert into Restaurants(name, minOrderPrice, categoryId, locationId, delieveryFee)
        values(?,?,?,?,?);
    `;
  const [rows] = await connection.query(insertRestaurantQuery, insertParams);

  return rows;
};
