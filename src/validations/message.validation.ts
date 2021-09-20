import Joi from "joi";
import {TYPEMESSAGE} from "../constants/message.constant";


const createMessage = {
    params: Joi.object().keys({
        targetId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        content: Joi.string(),
        link: Joi.string(),
        type: Joi.string().valid(TYPEMESSAGE.FILE, TYPEMESSAGE.IMAGE, TYPEMESSAGE.VIDEO, TYPEMESSAGE.TEXT),
    })
}

const deleteConversation = {
    params: Joi.object().keys({
        targetId: Joi.number().required(),
    })
}

const getListMessages = {
    params: Joi.object().keys({
        targetId: Joi.number().required(),
    }),
    query: Joi.object().keys({
        limit: Joi.number().required().min(0),
        page: Joi.number().required().min(0),
    })
}

export default {
    createMessage,
    deleteConversation,
    getListMessages
}