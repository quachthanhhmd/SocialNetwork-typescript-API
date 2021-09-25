import httpStatus from "http-status";
import { Request, Response} from "express";

import backgroundService from "../services/background.service";
import userService from "../services/user.service";

import catchAsync from "../utils/catchAsync";
import { IUserInfoSummary } from "../interfaces/user.interface";
import { IBackgroundCreate } from "../interfaces/background.interface";

import UserError from "../constants/apiError/user.contant";
import AuthError from "../constants/apiError/auth.constant";


interface RequestCreateBackground extends Request {

    user: IUserInfoSummary,
    body: IBackgroundCreate,
}


const createBackground = catchAsync(async (req : RequestCreateBackground, res: Response) => {

    const userId = req.user!.id;

    const user = userService.findUserById(userId);

    if (!user) throw UserError.UserNotFound;

    const newBackground = await backgroundService.createBackground(userId, req.body);


    res.status(httpStatus.CREATED).send(newBackground);
})





const updateBackground = catchAsync(async (req: RequestCreateBackground, res: Response) => {

    const backgroundId = +req.params.backgroundId;

    const userId = req.user!.id;

    const isBelongto = await backgroundService.checkBelongsto(userId, backgroundId);

    if (!isBelongto) throw AuthError.Forbidden;

    await backgroundService.updateBackground(backgroundId, req.body);

    res.status(httpStatus.OK).send({});
})


interface RequestWithUser extends Request {
    user: IUserInfoSummary,
}

const deleteBackground = catchAsync(async(req: RequestWithUser, res: Response) => {

    const backgroundId = +req.params.backgroundId;
    const userId = req.user!.id

    const isBelongto = await backgroundService.checkBelongsto(userId, backgroundId);

    if (!isBelongto) throw AuthError.Forbidden;

    await backgroundService.deleteBackground(backgroundId);

    res.status(httpStatus.OK).send({});
})

//No need to login to watch background
const findAllBackground = catchAsync(async (req: Request, res: Response) => {

    const userId = +req.params.userId;

    const backgroundList = await backgroundService.findAllBackground(userId);

    res.status(httpStatus.OK).send(backgroundList);
})


export default {
    createBackground,
    updateBackground,
    deleteBackground,
    findAllBackground
}