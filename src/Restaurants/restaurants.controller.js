import responseHandler from "../Config/responseHandler";
import validationSchema from "../Validations/validationSchema";
import restaurantProvider from "./restaurants.provider";
import restaurantService from "./restaurants.service";

const getRestaurants = async (req, res) => {
  const {
    query: { search, order, categoryId },
  } = req;
  try {
    if (search) {
      const { result, error } =
        await restaurantProvider.retrieveRestaurantsByKeyword(search, order);
      if (result) {
        return responseHandler.successResponse(res, result);
      } else {
        throw error;
      }
    } else if (categoryId) {
      const { result, error } =
        await restaurantProvider.retrieveRestaurantByCategoryId(
          categoryId,
          order
        );
      if (result) {
        return responseHandler.successResponse(res, result);
      } else {
        throw error;
      }
    } else {
      const { result, error } = await restaurantProvider.retrieveRestaurants(
        order
      );
      if (result) {
        return responseHandler.successResponse(res, result);
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};

const postRestaurant = async (req, res) => {
  const {
    body: { name, minOrderPrice, categoryId, locationId, delieveryFee },
  } = req;
  try {
    const { result, error } = await restaurantService.createRestaurant({
      name,
      minOrderPrice,
      categoryId,
      locationId,
      delieveryFee,
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

const getRestaurantById = async (req, res) => {
  let {
    params: { restaurantId },
  } = req;
  restaurantId = Number(restaurantId);
  try {
    await validationSchema.validateNumber(restaurantId);

    const { result, error } = await restaurantProvider.retrieveRestaurantById(
      restaurantId
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

//?????? ????????? ????????? ????????? ???????????? ???
const getRestaurantByKeyword = async (req, res) => {
  const {
    query: { search },
  } = req;
  try {
    const { result, error } =
      await restaurantProvider.retrieveRestaurantsByKeyword(search);
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

const restaurantController = {
  getRestaurants,
  postRestaurant,
  getRestaurantById,
  getRestaurantByKeyword,
};

export default restaurantController;
