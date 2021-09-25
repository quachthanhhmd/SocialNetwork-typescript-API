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

const updateBackground = {
    params: Joi.object().keys({
        backgroundId: Joi.number().required()
    }),
    body: Joi.object().keys({
        name:  Joi.string().required(), 
        status: Joi.string().required(),
        type: Joi.string().required(),
        description: Joi.string().required(),
        link: Joi.string().required(),
    })
}

const deleteBackground = {
    params: Joi.object().keys({
        backgroundId: Joi.number().required()
    })
}


const findAllBackground = {
    params: Joi.object().keys({
        userId: Joi.number().required()
    })
}

export default {
    createBackground,
    updateBackground,
    deleteBackground,
    findAllBackground
}