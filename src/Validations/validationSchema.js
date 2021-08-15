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
};

export default validationSchema;
