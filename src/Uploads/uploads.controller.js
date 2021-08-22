import responseHandler from "../Config/responseHandler";
import restaurantService from "../Restaurants/restaurants.service";

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

const uploadController = {
  postUploadRestaurantImg,
};

export default uploadController;
