import Joi from "joi";

const validatePostUserBody = async ({ email, password, phoneNumber, name }) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(8).required(),
    phoneNumber: Joi.string().required(),
    name: Joi.string().required(),
  });
  const validationResult = await schema.validateAsync({
    email,
    password,
    phoneNumber,
    name,
  });

  return validationResult;
};

const validatePostCart = async ({ userId, menuId, menuCounts }) => {
  const schema = Joi.object().keys({
    userId: Joi.number().required(),
    menuId: Joi.number().required(),
    menuCounts: Joi.number().required(),
  });

  const validationResult = await schema.validateAsync({
    userId,
    menuId,
    menuCounts,
  });

  return validationResult;
};

const validatePostOptionCart = async ({ optionId, cartId }) => {
  const schema = Joi.object().keys({
    optionId: Joi.number().required(),
    cartId: Joi.number().required(),
  });

  const validationResult = await schema.validateAsync({
    optionId,
    cartId,
  });

  return validationResult;
};

const validateLoginBody = async ({ email, password }) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required(),
  });
  const validationResult = await schema.validateAsync({
    email,
    password,
  });

  return validationResult;
};
const validateNumber = async (number) => {
  const schema = Joi.number().required();

  const validationResult = await schema.validateAsync(number);

  return validationResult;
};

const validatePostOrder = async ({ userId, cartId }) => {
  const schema = Joi.object().keys({
    userId: Joi.number().required(),
    cartId: Joi.number().required(),
  });
  const validateResult = await schema.validateAsync({ userId, cartId });

  return validateResult;
};
const validatePostReview = async ({ userId, review, restaurantId, rating }) => {
  const schema = Joi.object().keys({
    userId: Joi.number().required(),
    review: Joi.string().required(),
    restaurantId: Joi.number().required(),
    rating: Joi.number().min(0).max(5).required(),
  });
  const validateResult = await schema.validateAsync({
    userId,
    review,
    restaurantId,
    rating,
  });

  return validateResult;
};
const validatePostUserLocation = async ({ location, category, userId }) => {
  const schema = Joi.object().keys({
    location: Joi.string().required(),
    category: Joi.string().required(),
    userId: Joi.number().required(),
  });

  const validateResult = await schema.validateAsync({
    location,
    category,
    userId,
  });

  return validateResult;
};

const validatePostReviewLike = async ({ reviewId, isHelp, userId }) => {
  const schema = Joi.object().keys({
    reviewId: Joi.number().required(),
    isHelp: Joi.number().required(),
    userId: Joi.number().required(),
  });
  const validateResult = await schema.validateAsync({
    reviewId,
    isHelp,
    userId,
  });

  return validateResult;
};

const validationSchema = {
  validatePostUserBody,
  validateLoginBody,
  validatePostCart,
  validatePostOptionCart,
  validateNumber,
  validatePostOrder,
  validatePostReview,
  validatePostUserLocation,
  validatePostReviewLike,
};

export default validationSchema;
