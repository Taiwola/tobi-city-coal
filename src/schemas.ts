import Joi, { ObjectSchema } from "joi";

const register = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  age: Joi.string().required(),
  gender: Joi.string().required(),
  state: Joi.string().required(),
  lga: Joi.string().required(),
  term: Joi.boolean().required(),
});

export default {
   "/users/register": register,
 } as { [key: string]: ObjectSchema };
