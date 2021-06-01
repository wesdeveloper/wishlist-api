import Joi from 'joi';

export const clientSignUpSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});
