import responseHandler from "../Config/responseHandler";
import locationProvider from "./locations.provider";
import locationService from "./locations.service";

//모든 식당 위치 조회
const getRestaurantLocations = async (req, res) => {
  try {
    const { result, error } =
      await locationProvider.retrieveRestaurantLocations();

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
//모든 유저 위치 조회
const getUserLocations = async (req, res) => {
  try {
    const { result, error } = await locationProvider.retrieveUserLocations();

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
//특정 식당 위치 조회
const getRestaurantLocationById = async (req, res) => {
  const {
    params: { restaurantId },
  } = req;
  try {
    const { result, error } =
      await locationProvider.retrieveRestaurantLocationById(restaurantId);

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
//특정 유저 위치 전체 조회
const getUserLocationById = async (req, res) => {
  const { userId } = req;
  console.log(userId);
  try {
    const { result, error } = await locationProvider.retrieveUserLocationById(
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
//식당 위치 생성
const postRestaurantLocation = async (req, res) => {
  const {
    body: { latitude, longitude },
  } = req;
  try {
    const { result, error } = await locationService.createRestaurantLocation({
      latitude,
      longitude,
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
//유저 위치 생성
const postUserLocation = async (req, res) => {
  const {
    userId,
    body: { latitude, longitude, category },
  } = req;
  try {
    const { result, error } = await locationService.createUserLocation({
      latitude,
      longitude,
      category,
      userId,
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

const locationController = {
  getRestaurantLocations,
  postRestaurantLocation,
  getUserLocations,
  postUserLocation,
  getRestaurantLocationById,
  getUserLocationById,
};

export default locationController;
