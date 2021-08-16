const successResponse = (res, { isSuccess, code, message, result }) => {
  return res.json({
    isSuccess: isSuccess,
    code: code,
    message: message,
    result: result,
  });
};

const errResponse = (res, { isSuccess, code, message }) => {
  return res.json({
    isSuccess: isSuccess,
    code: code,
    message: message,
  });
};

const responseHandler = { successResponse, errResponse };

export default responseHandler;
