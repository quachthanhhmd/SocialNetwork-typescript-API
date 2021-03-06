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
        limit: Joi.number().min(0).default(8),
        page: Joi.number().min(0).default(1),
        search: Joi.string(),
    })
}

const deleteOneMessage = {
    params: Joi.object().keys({
        targetId: Joi.number().required(),
        messageId: Joi.number().required(),
    })
}


export default {
    createMessage,
    deleteConversation,
    getListMessages,
    deleteOneMessage
}