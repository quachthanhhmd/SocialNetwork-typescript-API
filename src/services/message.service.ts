import Message from "../models/messages";
import userService from "../services/user.service";

import UserError from "../constants/apiError/user.contant";

import { IMessageContent, IMessageCreate } from "../interfaces/mesage.interface";


/**
 * Create message by Id
 * @param {number} userId 
 * @param  {number} targetId 
 * @param {IMessageContent} content 
 */
const createMessageById = async (userId: number, targetId: number, content: IMessageContent) => {

    const userTarget = userService.findUserById(targetId);

    if (!userTarget) throw UserError.UserNotFound;

    const newMessage: IMessageCreate = Object.assign(content, { sourceId: userId, targetId: targetId });

    await Message.create(newMessage);
}


//const getMessages = async (userId: number, targetId: number, )


export default {
    createMessageById
}