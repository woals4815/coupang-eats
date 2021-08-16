import responseHandler from "../Config/responseHandler";
import locationProvider from "./locations.provider";
import locationService from "./locations.service";

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

const getUserLocationById = async (req, res) => {
  const {
    params: { userId },
  } = req;
  try {
    const { result, error } = await locationProvider.retrieveUserLocationById(
      userId
    );
    if (result) {
      return responseHandler.errResponse(res, error);
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
    return responseHandler.errResponse(res, error);
  }
};

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

const postUserLocation = async (req, res) => {
  const {
    body: { latitude, longitude, category, userId },
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
