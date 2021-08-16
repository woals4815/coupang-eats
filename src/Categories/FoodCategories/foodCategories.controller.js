import responseHandler from "../../Config/responseHandler";
import foodCategoriesProvider from "./foodCategories.provider";
import foodCategoriesService from "./foodCategories.service";

const getFoodCategories = async (req, res) => {
  try {
    const { result, error } =
      await foodCategoriesProvider.retrieveFoodCategories();

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

const postFoodCategories = async (req, res) => {
  const {
    body: { categoryName },
  } = req;
  try {
    const { result, error } = await foodCategoriesService.createCategory(
      categoryName
    );
    console.log(result);
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

const foodCategoriesController = {
  getFoodCategories,
  postFoodCategories,
};

export default foodCategoriesController;
