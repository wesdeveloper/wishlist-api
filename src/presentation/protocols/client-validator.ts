import Joi from 'joi';

export const clientCreateSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});
