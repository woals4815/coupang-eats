const jwt = require("jsonwebtoken");
const { default: baseResponse } = require("./baseResponse");
const { default: responseHandler } = require("./responseHandler");

const jwtMiddleware = (req, res, next) => {
  // read the token from header or url
  const token = req.headers["x-jwt"] || req.query.token;
  // token does not exist
  if (!token) {
    return responseHandler.errResponse(res, baseResponse.TOKEN_EMPTY);
  } else {
    const verifyResult = jwt.verify(token, process.env.JWT_SECRET);
    if (verifyResult) {
      req.userId = verifyResult.userId;
      next();
    }
  }

  // create a promise that decodes the token
  //   const p = new Promise((resolve, reject) => {
  //     jwt.verify(token, secret_config.jwtsecret, (err, verifiedToken) => {
  //       if (err) reject(err);
  //       resolve(verifiedToken);
  //     });
  //   });

  // if it has failed to verify, it will return an error message
  //   const onError = (error) => {
  //     return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
  //   };
  // process the promise
  //   p.then((verifiedToken) => {
  //     //비밀 번호 바뀌었을 때 검증 부분 추가 할 곳
  //     req.verifiedToken = verifiedToken;
  //     next();
  //   }).catch(onError);
};

module.exports = jwtMiddleware;
