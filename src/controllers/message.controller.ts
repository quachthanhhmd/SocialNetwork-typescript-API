import {Request, Response} from "express";

import httpStatus from "http-status";


import messageService from "../services/message.service";
import catchAsync from "../utils/catchAsync";

import {IMessageContent} from "../interfaces/mesage.interface";
import { IUserInfoSummary } from "../interfaces/user.interface";

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


export default {
    createMessage
}