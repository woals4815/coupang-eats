const START_POINT = "/";
const USERS = "/users";
const USER_ID = "/:userId";
const RESTAURANTS = "/restaurants";
const RESTAURANT_ID = "/:restaurantId";
const LOGIN = "/login";
const USER_PROFILE = "/user-profile";
const CATEGORIES = "/categories";
const FOOD_CATEGORY = "/food";
const INFO_CATEGORY = "/info";
const MENU_CATEGORY = "/menu";
const CATEGORY_DETAIL = "/:categoryId";
const OPTION_CATEGORY = "/option-category";
const LOCATIONS = "/locations";
const RESTAURANT_LOCATIONS_DETAIL = "/restaurants/:restaurantId";
const USER_LOCATIONS_DETAIL = "/users/:userId";
const MENUS = "/menus";
const MENU_DETAIL = "/:menuId";
const CARTS = "/carts";
const CART_DETAIL = "/:cartId";
const OPTIONS = "/options";
const ORDERS = "/orders";
const REVIEWS = "/reviews";
const UPLOADS = "/uploads";
const ORDER_DETAIL = "/:orderId";
const HISTORY = "/history";
const FAVORITES = "/favorites";

const routes = {
  start: START_POINT,
  users: USERS,
  userId: USER_ID,
  restaurants: RESTAURANTS,
  restaurantId: RESTAURANT_ID,
  login: LOGIN,
  userProfile: USER_PROFILE,
  categories: CATEGORIES,
  foodCategory: FOOD_CATEGORY,
  infoCategory: INFO_CATEGORY,
  menuCategory: MENU_CATEGORY,
  optionCategory: OPTION_CATEGORY,
  locations: LOCATIONS,
  restaurantLocationDetail: RESTAURANT_LOCATIONS_DETAIL,
  userLocationDetail: USER_LOCATIONS_DETAIL,
  menus: MENUS,
  menuDetail: MENU_DETAIL,
  carts: CARTS,
  cartDetail: CART_DETAIL,
  options: OPTIONS,
  orders: ORDERS,
  reviews: REVIEWS,
  uploads: UPLOADS,
  orderDetail: ORDER_DETAIL,
  history: HISTORY,
  favorites: FAVORITES,
  categoryDetail: CATEGORY_DETAIL,
};

export default routes;
