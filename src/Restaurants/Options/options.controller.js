import responseHandler from "../../Config/responseHandler";
import optionProvider from "./options.provider";
import optionService from "./options.service";

const getOptions = async (req, res) => {
  const { query } = req;
  try {
    const { result, error } = await optionProvider.retrieveOptions(query);

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

const postOption = async (req, res) => {
  const { body } = req;
  try {
    const { result, error } = await optionService.createOption(body);

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

const optionController = {
  getOptions,
  postOption,
};

export default optionController;
