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

const validationSchema = {
  validatePostUserBody,
  validateLoginBody,
  validatePostCart,
  validatePostOptionCart,
};

export default validationSchema;
