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
const OPTION_CATEGORY = "/option-category";
const LOCATIONS = "/locations";
const RESTAURANT_LOCATIONS_DETAIL = "/restaurants/:restaurantId";
const USER_LOCATIONS_DETAIL = "/users/:userId";
const MENUS = "/menus";
const MENU_DETAIL = "/:menuId";

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
};

export default routes;
