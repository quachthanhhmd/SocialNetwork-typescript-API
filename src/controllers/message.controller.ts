import { Request, Response } from "express";

import httpStatus from "http-status";


import messageService from "../services/message.service";
import catchAsync from "../utils/catchAsync";

import { IMessageContent } from "../interfaces/message.interface";
import { IUserInfoSummary } from "../interfaces/user.interface";
import { IPagination, ISearchPagination } from "../interfaces/pagination.interface";

interface RequestWithUser extends Request {
    user: IUserInfoSummary,
    body: IMessageContent,
}


const createMessage = catchAsync(async (req: RequestWithUser, res: Response) => {

    const senderId = req.user!.id;
    const targetId = +req.params.targetId;

    await messageService.createMessageById(senderId, targetId, req.body);

    res.status(httpStatus.CREATED).send({});
})


//delete all messages 
const deleteConversation = catchAsync(async (req: RequestWithUser, res: Response) => {

    const senderId = req.user!.id;
    const targetId = +req.params.targetId;

    await messageService.deleteConversationByUserId(senderId, targetId);
    res.status(httpStatus.OK).send({});
})



interface RequestPaging extends Request<any, any, any, ISearchPagination> {

    user: IUserInfoSummary,
}
//get list message 
const getListMessages = catchAsync(async (req: RequestPaging, res: Response) => {

    const senderId = req.user!.id;
    const targetId = +req.params.targetId;



    const messageList = await messageService.findListMessage(senderId, targetId, req.query);

    res.status(httpStatus.OK).send(messageList);
});


const deleteOneMessage = catchAsync(async (req: RequestWithUser, res: Response) => {
    
    const senderId = req.user!.id;
    const targetId = +req.params.targetId;
    const messageId = +req.params.messageId;

    await messageService.deleteOneMessage(senderId, targetId, messageId);

    res.status(httpStatus.OK).send({});
})



export default {
    createMessage,
    deleteConversation,
    getListMessages,
    deleteOneMessage
}