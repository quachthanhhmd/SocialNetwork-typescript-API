import Joi from "joi";

const createBackground = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        status: Joi.string().required(),
        type: Joi.string().required(),
        description: Joi.string().required(),
        link: Joi.string().required(),
    }),
}


export default {
    createBackground
}