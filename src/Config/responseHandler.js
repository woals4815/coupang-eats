const successResponse = (res, { isSuccess, code, message, result }) => {
  if (code === 1000) {
    return res.status(200).json({
      isSuccess: isSuccess,
      code: code,
      message: message,
      result: result,
    });
  } else if (code === 1001) {
    return res.status(201).json({
      isSuccess: isSuccess,
      code: code,
      message: message,
      result: result,
    });
  } else {
    return res.status(200).json({
      isSuccess: isSuccess,
      code: code,
      message: message,
      result: result,
    });
  }
};

const errResponse = (res, { isSuccess, code, message }) => {
  return res.status(400).json({
    isSuccess: isSuccess,
    code: code,
    message: message,
  });
};

const responseHandler = { successResponse, errResponse };

export default responseHandler;
