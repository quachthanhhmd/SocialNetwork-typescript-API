import { Op } from "sequelize";

import Message from "../models/messages";
import userService from "../services/user.service";

import UserError from "../constants/apiError/user.contant";
import MessageError from "../constants/apiError/message.constant";

import { IMessageContent, IMessageCreate } from "../interfaces/mesage.interface";


/**
 * Find  a conversation of user 
 * a conversation only responses messages which are not removeing 
 * @param {number} userId 
 * @param {} targetId 
 * @returns { Promise<Message> }
 */
const findAConversation = async (userId: number, targetId: number) : Promise<Message | null> =>{

    return await Message.findOne({
        where: {
            [Op.or]: [
                {
                    [Op.and]: [
                        { sourceId: userId, },
                        { targetId: targetId },
                        { isDeletedA: false},
                    ]
                },
                {
                    [Op.and]: [
                        { sourceId: targetId,},
                        { targetId: userId },
                        { isDeletedB: false},
                    ]
                }
            ]  
        }
    })
}

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


interface IStateMessage {
    type?: string,
    status?: string,
    isDeletedB?: Boolean,
    isDeletedA?: Boolean,
}


/**
 * Update State of message 
 * @param userId 
 * @param targetId 
 * @param updateState 
 */
const updateStateMessage = async (userId: number, targetId: number, updateState: IStateMessage) => {


    await Message.update(
        updateState,
        {
            where: {
                [Op.and]: [
                    { sourceId: userId, },
                    { targetId: targetId },
                ]
            }
        }
    )
}




//detete a conversation
const deleteConversationByUserId = async (userId: number, targetId: number) => {

    const userTarget = userService.findUserById(targetId);

    if (!userTarget) throw UserError.UserNotFound;

    //find a conversation
    const conversation = await findAConversation(userId, targetId);

    console.log(conversation);
    if (!conversation) throw MessageError.NotFound;
    
    //we will update 2 times,
    //fisrtly, deletefromA will be set for record which has userId and targetId as a sourceId and targetId
    //Secondly, deletefrom b will be set for opposite case.
    await updateStateMessage(userId, targetId, {isDeletedA : true});
    await updateStateMessage(targetId, userId, {isDeletedB : true});
}

export default {
    createMessageById,
    deleteConversationByUserId
}