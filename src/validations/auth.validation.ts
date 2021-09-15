import { MALE, FEMALE, OTHER } from './../constants/gender.constant';
import Joi from "joi";

import custom from "./custom.validation";


const signUp = {
    body: Joi.object().keys({
        username: Joi.string().required().email(),
        password: Joi.string().required().custom(custom.passwordCheck),
        password2: Joi.string().valid(Joi.ref('password')).required(),
        birthDay: Joi.date().required(),
        gender: Joi.string().valid(MALE, FEMALE, OTHER),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    })
};

const signIn = {
    body: Joi.object().keys({
        username: Joi.string().required().email(),
        password: Joi.string(),
    }),
}
const logout = {
    body: Joi.object().keys({
      refreshToken: Joi.string().required(),
    }),
  };
  

export default {
    signUp,
    signIn,
    logout
}