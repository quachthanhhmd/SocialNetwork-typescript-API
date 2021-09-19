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

export default {
    createMessage
}