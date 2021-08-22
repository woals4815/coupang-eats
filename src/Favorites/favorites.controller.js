import responseHandler from "../Config/responseHandler";
import favoriteProvider from "./favorites.provider";
import favoriteService from "./favorites.service";

const getUserFavorites = async (req, res) => {
  const { userId } = req;
  try {
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
  const {
    userId,
    body: { restaurantId },
  } = req;
  try {
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
