import responseHandler from "../Config/responseHandler";
import validationSchema from "../Validations/validationSchema";
import favoriteProvider from "./favorites.provider";
import favoriteService from "./favorites.service";

const getUserFavorites = async (req, res) => {
  let { userId } = req;
  userId = Number(userId);
  try {
    await validationSchema.validateNumber(userId);
    const { result, error } = await favoriteProvider.retrieveUserFavorites(
      userId
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

const postFavorites = async (req, res) => {
  let {
    userId,
    body: { restaurantId },
  } = req;
  userId = Number(userId);
  restaurantId = Number(restaurantId);
  try {
    await validationSchema.validateNumber(userId);
    await validationSchema.validateNumber(restaurantId);

    const { result, error } = await favoriteService.createFavorites({
      userId,
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

const favoriteController = {
  postFavorites,
  getUserFavorites,
};

export default favoriteController;
