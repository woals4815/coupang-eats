export const selectRestaurantLocations = async (connection) => {
  const selectRestaurantLocationsQuery = `
        select id, latitude, longitude 
        from RestaurantLocations;
    `;
  const [rows] = await connection.query(selectRestaurantLocationsQuery);

  return rows;
};

export const insertRestaurantLocation = async (connection, locationParams) => {
  const insertRestaurantLocationQuery = `
        insert RestaurantLocations(latitude, longitude)
        values(?,?);
    `;
  const [rows] = await connection.query(
    insertRestaurantLocationQuery,
    locationParams
  );
  return rows;
};

export const selectUserLocations = async (connection) => {
  const selectUserLocationsQuery = `
          select id, latitude, longitude, category, userId
          from UserLocations
          order by createAt desc;
          ;
      `;
  const [rows] = await connection.query(selectUserLocationsQuery);

  return rows;
};

export const insertUserLocation = async (connection, inserParams) => {
  const insertUserLocationQuery = `
        insert UserLocations(latitude, longitude, category, userId)
        values(?,?,?,?);
    `;
  const [rows] = await connection.query(insertUserLocationQuery, inserParams);
  return rows;
};

export const selectRestaurantLocationById = async (
  connection,
  restaurantId
) => {
  const selectRestaurantLocationByIdQuery = `
        select id, latitude, longitude 
        from RestaurantLocations
        where id = ?;
    `;
  const [rows] = await connection.query(
    selectRestaurantLocationByIdQuery,
    restaurantId
  );

  return rows;
};

export const selectUserLocationById = async (connection, userId) => {
  const selectUserLocationByIdQuery = `
        select id, latitude, longitude, category, userId
        from UserLocations
        where userId = ?;
    `;
  const [rows] = await connection.query(selectUserLocationByIdQuery, userId);

  return rows;
};
