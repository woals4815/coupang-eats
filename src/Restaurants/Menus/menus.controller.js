import responseHandler from "../../Config/responseHandler";
import menuProvider from "./menus.provider";
import menuService from "./menus.service";

//전체 식당 전체 메뉴 조회
const getMenus = async (req, res) => {
  const { query } = req;
  try {
    const { result, error } = await menuProvider.retrieveMenus(query);

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
//식당 메뉴 생성
const postMenu = async (req, res) => {
  const { body } = req;
  try {
    const { result, error } = await menuService.createMenu(body);

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

const menuController = {
  getMenus,
  postMenu,
};

export default menuController;
