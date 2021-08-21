export const insertReview = async (connection, insertParams) => {
  const insertReviewQuery = `
        insert into Reviews(userId, review, restaurantId, rating)
        values(?,?,?,?);
    `;

  const [rows] = await connection.query(insertReviewQuery, insertParams);

  return rows;
};
//모든 식당 모든 리뷰 전체 조회
export const selectReviews = async (connection) => {
  const selectReviewsQuery = `
        select Reviews.id, userId, review, restaurantId, rating, Reviews.createAt,
        Restaurants.name, Users.name
        from Reviews
        join Users
        on Users.id = Reviews.userId
        join Restaurants
        on Restaurants.id = Reviews.restaurantId;
    `;

  const [rows] = await connection.query(selectReviewsQuery);

  return rows;
};

export const selectReviewsByRestaurant = async (connection, restaurantId) => {
  const selectReviewsByRestaurantQuery = `
        select Reviews.id, userId, review, restaurantId, rating, Reviews.createAt,
        Restaurants.name, Users.name
        from Reviews
        join Users
        on Users.id = Reviews.userId
        join Restaurants
        on Restaurants.id = Reviews.restaurantId
        where Restaurants.id = ?
        order by Reviews.createAt desc;
    `;
  const [rows] = await connection.query(
    selectReviewsByRestaurantQuery,
    restaurantId
  );

  return rows;
};

export const selectReviewsByRestaurantOrderHelp = async (
  connection,
  restaurantId
) => {
  const query = `
        select Reviews.id, userId, review, restaurantId, rating, Reviews.createAt,
        Restaurants.name, Users.name, sum(isHelp) as isHelpTotal
        from Reviews
        join Users
        on Users.id = Reviews.userId
        join Restaurants
        on Restaurants.id = Reviews.restaurantId
        left join ReviewLikes
        on ReviewLikes.reviewId = Reviews.id
        where Restaurants.id = ?
        order by sum(isHelp) desc;
    `;
  const [rows] = await connection.query(query, restaurantId);

  return rows;
};

export const selectReviewsByRestaurantOrderRating = async (
  connection,
  restaurantId
) => {
  const query = `
        select Reviews.id, userId, review, restaurantId, rating, Reviews.createAt,
        Restaurants.name, Users.name
        from Reviews
        join Users
        on Users.id = Reviews.userId
        join Restaurants
        on Restaurants.id = Reviews.restaurantId
        where Restaurants.id = ?
        order by rating desc;
    `;

  const [rows] = await connection.query(query, restaurantId);

  return rows;
};
