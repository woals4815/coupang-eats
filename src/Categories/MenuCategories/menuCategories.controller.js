import responseHandler from "../../Config/responseHandler";
import menuCategoriesProvider from "./menuCategories.provider";
import menuCategoryService from "./menuCategories.service";

const getMenuCategories = async (req, res) => {
  const { query } = req;
  try {
    const { result, error } =
      await menuCategoriesProvider.getMenuCategoryByRestaurantId(query);
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

const postMenuCategory = async (req, res) => {
  const { body } = req;
  try {
    const { result, error } = await menuCategoryService.createMenuCategory(
      body
    );
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

const menuCategoryController = {
  getMenuCategories,
  postMenuCategory,
};

export default menuCategoryController;
