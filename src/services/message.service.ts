import { Op } from "sequelize";

import Message from "../models/messages";
import userService from "../services/user.service";

import UserError from "../constants/apiError/user.contant";
import MessageError from "../constants/apiError/message.constant";

import { IMessageContent, IMessageCreate } from "../interfaces/message.interface";
import { IPagination, IPaginationResult, ISearchPagination } from "../interfaces/pagination.interface";

/**
 * Find  a conversation of user 
 * a conversation only responses messages which are not removeing 
 * @param {number} userId 
 * @param {} targetId 
 * @returns { Promise<Message> }
 */
const findAConversation = async (userId: number, targetId: number): Promise<Message | null> => {

    return await Message.findOne({
        where: {
            [Op.or]: [
                {
                    [Op.and]: [
                        { sourceId: userId, },
                        { targetId: targetId },
                        { isDeletedA: false },
                    ]
                },
                {
                    [Op.and]: [
                        { sourceId: targetId, },
                        { targetId: userId },
                        { isDeletedB: false },
                    ]
                }
            ]
        }
    })
}

/**
 * Count Record by query
 * @param {number} userId 
 * @param {number} targetId 
 * @param {ISearchPagination} paging 
 * @returns
 */
const countMessageByQuery = async (userId: number, targetId: number, paging: ISearchPagination) => {

    const searchString = paging.search ? paging.search : "";
     const totalRecord =  await Message.count({
        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        {
                            [Op.and]: [
                                { sourceId: userId, },
                                { targetId: targetId },
                                { isDeletedA: false },
                            ]
                        },
                        {
                            [Op.and]: [
                                { sourceId: targetId, },
                                { targetId: userId },
                                { isDeletedB: false },
                            ]
                        },

                    ]
                },
                {
                    content: {
                        [Op.like]: `%${searchString}%`
                    }
                }
            ]
        },

    });
    return {
        totalRecord,
        totalPage: Math.ceil(totalRecord / paging.limit),
        limit: paging.limit,
        page: paging.page,
    }
}


/**
 * Get list message to display
 * @param {number} userId 
 * @param {number} targetId 
 * @param {IPagination} paging 
 * @returns {Promise<Array<Message> | null>}
 */
const findListMessage = async (userId: number, targetId: number, paging: ISearchPagination)=> {

    const searchString = paging.search ? paging.search : "";

    const result =  await Message.findAll({
        attributes: ["id", "type", "content", "link", "status"],

        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        {
                            [Op.and]: [
                                { sourceId: userId, },
                                { targetId: targetId },
                                { isDeletedA: false },
                            ]
                        },
                        {
                            [Op.and]: [
                                { sourceId: targetId, },
                                { targetId: userId },
                                { isDeletedB: false },
                            ]
                        },

                    ]
                },
                {
                    content: {
                        [Op.like]: `%${searchString}%`
                    }
                }
            ]
        },
        order: [['createdAt', 'ASC']],
        limit: paging.limit,
        offset: paging.limit * (paging.page - 1),
    })

    const pagingStatistic :IPaginationResult = await countMessageByQuery(userId, targetId, paging);

    return Object.assign({result: result}, pagingStatistic);
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
 * @return {Promise<void>}
 */
const updateStateMessage = async (userId: number, targetId: number, updateState: IStateMessage): Promise<void> => {


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




/**
 * Delete a conversation
 * @param {number} userId 
 * @param {number} targetId 
 * @return {Promise<void>}
 */
const deleteConversationByUserId = async (userId: number, targetId: number): Promise<void> => {

    const userTarget = userService.findUserById(targetId);

    if (!userTarget) throw UserError.UserNotFound;

    //find a conversation
    const conversation = await findAConversation(userId, targetId);

    if (!conversation) throw MessageError.NotFound;

    //we will update 2 times,
    //fisrtly, deletefromA will be set for record which has userId and targetId as a sourceId and targetId
    //Secondly, deletefrom b will be set for opposite case.
    await updateStateMessage(userId, targetId, { isDeletedA: true });
    await updateStateMessage(targetId, userId, { isDeletedB: true });
}

const deleteOneMessage = async (userId: number, targetId: number, messageId: number) => {



    const message = await Message.findOne({
        where: {
            id: messageId,
        }
    })


    if (!message) throw MessageError.NotFound;

    if (message.sourceId === userId) {

        await Message.update(
            { isDeletedA: true },
            {
                where: {
                    id: messageId,
                }
            }
        )
    }
    else {
        await Message.update(
            { isDeletedB: true },
            {
                where: {
                    id: messageId,
                }
            }
        )
    }

}
export default {
    createMessageById,
    deleteConversationByUserId,
    findListMessage,
    deleteOneMessage
}