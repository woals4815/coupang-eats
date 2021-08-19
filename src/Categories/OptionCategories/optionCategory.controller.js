import responseHandler from "../../Config/responseHandler";
import optionCategoryProvider from "./optionCategory.provider";
import optionCategoryService from "./optionCategory.service";

const postOptionCategory = async (req, res) => {
  const { body } = req;
  try {
    const { result, error } = await optionCategoryService.createOptionCategory(
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

const getOptionCategories = async (req, res) => {
  const { query } = req;
  try {
    const { result, error } =
      await optionCategoryProvider.retrieveOptionCategories(query);

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

const optionCategoryController = {
  postOptionCategory,
  getOptionCategories,
};

export default optionCategoryController;
