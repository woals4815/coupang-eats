import foodCategoriesService from "../Categories/FoodCategories/foodCategories.service";
import responseHandler from "../Config/responseHandler";
import menuService from "../Restaurants/Menus/menus.service";
import restaurantService from "../Restaurants/restaurants.service";
import validationSchema from "../Validations/validationSchema";

const postUploadRestaurantImg = async (req, res) => {
  const {
    file: { location },
    body: { restaurantId, isForMain },
  } = req;
  try {
    const { result, error } = await restaurantService.createRestaurantImg({
      imgUrl: location,
      isForMain,
      restaurantId,
    });
    if (result) {
      return responseHandler.successResponse(res, result);
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};
const postUploadCategoryImg = async (req, res) => {
  const {
    file: { location },
    body: { categoryId },
  } = req;
  try {
    const { result, error } = await foodCategoriesService.createCategoryImg({
      imgUrl: location,
      categoryId,
    });
    if (result) {
      return responseHandler.successResponse(res, result);
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};

const postUploadMenuImg = async (req, res) => {
  let {
    file: { location },
    body: { menuId },
  } = req;
  menuId = Number(menuId);
  try {
    await validationSchema.validateNumber(menuId);

    const { result, error } = await menuService.createMenuImg({
      menuId,
      location,
    });

    if (result) {
      return responseHandler.successResponse(res, result);
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};

const uploadController = {
  postUploadRestaurantImg,
  postUploadCategoryImg,
  postUploadMenuImg,
};

export default uploadController;
