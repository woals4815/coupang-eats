export const selectRestaurants = async (connection) => {
  const selectRestaurantsQuery = `
        select Restaurants.id, name, minOrderPrice, delieveryFee, categoryName,
        latitude, longitude, count(Reviews.id) as reviewCount, avg(rating) as ratingAvg
        from Restaurants
        join Categories
        on Categories.id = Restaurants.categoryId
        join RestaurantLocations
        on RestaurantLocations.id = Restaurants.locationId
        left join Reviews
        on Reviews.restaurantId = Restaurants.id
        group by Restaurants.id
    `;
  const [rows] = await connection.query(selectRestaurantsQuery);

  return rows;
};

export const selectRestaurantsOrderBest = async (connection) => {
  const selectRestaurantsOrderBestQuery = `
        select Restaurants.id, name, minOrderPrice, delieveryFee, categoryName,
        latitude, longitude, count(Reviews.id) as reviewCount, avg(rating) as ratingAvg
        from Restaurants
        join Categories
        on Categories.id = Restaurants.categoryId
        join RestaurantLocations
        on RestaurantLocations.id = Restaurants.locationId
        left join Reviews
        on Reviews.restaurantId = Restaurants.id
        group by Restaurants.id
        order by avg(rating)
    `;
  const [rows] = await connection.query(selectRestaurantsOrderBestQuery);

  return rows;
};

export const selectRestaurantsOrderNew = async (connection) => {
  const selectRestaurantsQuery = `
        select Restaurants.id, name, minOrderPrice, delieveryFee, categoryName,
        latitude, longitude, count(Reviews.id) as reviewCount, avg(rating) as ratingAvg
        from Restaurants
        join Categories
        on Categories.id = Restaurants.categoryId
        join RestaurantLocations
        on RestaurantLocations.id = Restaurants.locationId
        left join Reviews
        on Reviews.restaurantId = Restaurants.id
        group by Restaurants.id
        order by Restaurants.createAt desc
    `;
  const [rows] = await connection.query(selectRestaurantsQuery);

  return rows;
};

export const selectRestaurantById = async (connection, restaurantId) => {
  const selectRestaurantByIdQuery = `
        select Restaurants.id, name, minOrderPrice, delieveryFee, categoryName,
        latitude, longitude, count(Reviews.id) as reviewCount, avg(rating) as ratingAvg
        from Restaurants
        join Categories
        on Categories.id = Restaurants.categoryId
        join RestaurantLocations
        on RestaurantLocations.id = Restaurants.locationId
        left join Reviews
        on Reviews.restaurantId = Restaurants.id
        where Restaurants.id = ?
    `;
  const [rows] = await connection.query(
    selectRestaurantByIdQuery,
    restaurantId
  );
  console.log(rows);
  return rows;
};

export const selectRestaurantsOrderMany = async (connection) => {
  const selectRestaurantsOrderBestQuery = `
      select Restaurants.id, name, minOrderPrice, delieveryFee, categoryName,
      latitude, longitude, count(Reviews.id) as reviewCount, avg(rating) as ratingAvg
      from Restaurants
      join Categories
      on Categories.id = Restaurants.categoryId
      join RestaurantLocations
      on RestaurantLocations.id = Restaurants.locationId
      left join Reviews
      on Reviews.restaurantId = Restaurants.id
      group by Restaurants.id
      order by count(Reviews.id) desc;
  `;
  const [rows] = await connection.query(selectRestaurantsOrderBestQuery);

  return rows;
};

export const selectRestaurantsByKeyword = async (connection, keyword) => {
  const selectParams = `%${keyword}%`;
  const selectRestaurantsByKeywordQuery = `
    select Restaurants.id, name, minOrderPrice, delieveryFee, categoryName,
    latitude, longitude, count(Reviews.id) as reviewCount, avg(rating) as ratingAvg
    from Restaurants
    join Categories
    on Categories.id = Restaurants.categoryId
    join RestaurantLocations
    on RestaurantLocations.id = Restaurants.locationId
    left join Reviews
    on Reviews.restaurantId = Restaurants.id
    where concat(name) like ?
    group by Restaurants.id
  `;
  const [rows] = await connection.query(
    selectRestaurantsByKeywordQuery,
    selectParams
  );

  return rows;
};

export const selectRestaurantsByKeywordOrderNew = async (
  connection,
  keyword
) => {
  const selectParams = `%${keyword}%`;
  const query = `
    select Restaurants.id, name, minOrderPrice, delieveryFee, categoryName,
    latitude, longitude, count(Reviews.id) as reviewCount, avg(rating) as ratingAvg
    from Restaurants
    join Categories
    on Categories.id = Restaurants.categoryId
    join RestaurantLocations
    on RestaurantLocations.id = Restaurants.locationId
    left join Reviews
    on Reviews.restaurantId = Restaurants.id
    where concat(name) like ?
    group by Restaurants.id
    order by Restaurants.createAt desc;
  `;
  const [rows] = await connection.query(query, selectParams);

  return rows;
};

export const selectRestaurantsByKeywordOrderBest = async (
  connection,
  keyword
) => {
  const selectParams = `%${keyword}%`;
  const query = `
    select Restaurants.id, name, minOrderPrice, delieveryFee, categoryName,
    latitude, longitude, count(Reviews.id) as reviewCount, avg(rating) as ratingAvg
    from Restaurants
    join Categories
    on Categories.id = Restaurants.categoryId
    join RestaurantLocations
    on RestaurantLocations.id = Restaurants.locationId
    left join Reviews
    on Reviews.restaurantId = Restaurants.id
    where concat(name) like ?
    group by Restaurants.id
    order by avg(rating);
  `;
  const [rows] = await connection.query(query, selectParams);

  return rows;
};

export const selectRestaurantsByKeywordOrderMany = async (
  connection,
  keyword
) => {
  const selectParams = `%${keyword}%`;
  const query = `
    select Restaurants.id, name, minOrderPrice, delieveryFee, categoryName,
    latitude, longitude, count(Reviews.id) as reviewCount, avg(rating) as ratingAvg
    from Restaurants
    join Categories
    on Categories.id = Restaurants.categoryId
    join RestaurantLocations
    on RestaurantLocations.id = Restaurants.locationId
    left join Reviews
    on Reviews.restaurantId = Restaurants.id
    where concat(name) like ?
    group by Restaurants.id
    order by count(Reviews.id);
  `;
  const [rows] = await connection.query(query, selectParams);

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

export const insertRestaurantImg = async (connection, insertParams) => {
  const insertRestaurantImgQuery = `
    insert into RestaurantImages(imgUrl, restaurantId, isForMain)
    values(?,?,?)
  `;

  const [rows] = await connection.query(insertRestaurantImgQuery, insertParams);

  return rows;
};

export const selectRestaurantImg = async (connection, restaurantId) => {
  const selectRestaurantImgQuery = `
    select id, imgUrl, isForMain, restaurantId
    from RestaurantImages
    where restaurantId = ?;
  `;

  const [rows] = await connection.query(selectRestaurantImgQuery, restaurantId);

  return rows;
};

export const selectAllRestaurantImg = async (connection) => {
  const selectAllRestaurantImgQuery = `
    select id, imgUrl, isForMain, restaurantId
    from RestaurantImages;
  `;

  const [rows] = await connection.query(selectAllRestaurantImgQuery);

  return rows;
};
