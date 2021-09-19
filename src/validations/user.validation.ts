import { MALE, OTHER, FEMALE } from './../constants/gender.constant';
import Joi from "joi";

const getUser = {
    params: Joi.object().keys({
        id: Joi.number().required(),
    })
};

const updateUserProfile = {
    params: Joi.object().keys({
        id: Joi.number().required(),
    }),
    body: Joi.object().keys({
        firstName: Joi.string(),
        lastName: Joi.string(),
        birthDay: Joi.date(),
        gender: Joi.string().valid(MALE, FEMALE, OTHER),
        email: Joi.string().email(),
        phoneNumber: Joi.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/i),
        github: Joi.string(),
        skype: Joi.string(),
        linkedin: Joi.string(),
        
    })
}

const updateAvt = {
    params: Joi.object().keys({
        id: Joi.number().required(),
    }),
    file: Joi.object(),
}

const updateBackgroundImage = {
    params: Joi.object().keys({
        id: Joi.number().required(),
    }),
    file: Joi.object(),
}

const requestFriend = {
    params: Joi.object().keys({
        id: Joi.string().required()
    }),
}

const acceptFriend = {
    params: Joi.object().keys({
        id: Joi.string().required()
    }),
}

export default {
    getUser,
    acceptFriend,
    requestFriend,
    updateAvt,
    updateBackgroundImage,
    updateUserProfile,
}