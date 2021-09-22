import httpStatus from "http-status";

import { Request, Response } from "express";

import userService from "../services/user.service";
import catchAsync from "../utils/catchAsync";

import UserError from "../constants/apiError/user.contant";

import { IUserProfileUpdate, IUserInfoSummary } from "../interfaces/user.interface";

interface RequestUpdateUser extends Request {
    body: IUserProfileUpdate,
}

interface RequestWithUser extends Request {
    user: IUserInfoSummary,
}

//Get one user and use Id to get user
const getOneUser = catchAsync(async (req: Request, res: Response) => {

    const id = +req.params.id;

    console.log(id);
    const user = await userService.getFullUserInfo(id);

    if (!user) throw UserError.UserNotFound;

    console.log(user);
    res.status(httpStatus.OK).send(user);
})


//update information of user 
const updateUser = catchAsync(async (req: RequestUpdateUser, res: Response) => {

    const id = +req.params.id;


    const user = userService.updateAllInformation(id, req.body);
    res.status(httpStatus.OK).send("Update information sucesss");
})


//update image avt 
const updateAvt = catchAsync(async (req: Request, res: Response) => {

    const id = +req.params.id;

    await userService.updateImageUser(id, req.file, "avtImage", "avatar");

    res.status(httpStatus.NO_CONTENT).send();
})


//update backgroundImage
const updateBackgroundImage = catchAsync(async (req: Request, res: Response) => {

    const id = +req.params.id;

    await userService.updateImageUser(id, req.file, "backgroundImage", "background");

    res.status(httpStatus.CREATED).send({});
})


//accpet friend
const sendRequestFriend = catchAsync(async (req: RequestWithUser, res: Response) => {


    const userId = req.user!.id;
    const friendId = +req.params.id;

    await userService.sendRequestFriend(userId, friendId);


    return res.status(httpStatus.OK).send({});
})

const acceptFriend = catchAsync(async (req: RequestWithUser, res: Response) => {

    const userId =  req.user!.id;
    const friendId = +req.params.id;

    await userService.acceptRequetFriend(userId, friendId);

    res.status(httpStatus.OK).send({});
})


//refuse a friend request
const refuseFriendRequest = catchAsync( async (req: RequestWithUser, res: Response) => {

    const userId =  req.user!.id;
    const friendId = +req.params.id;

    await userService.refuseFriendRequest(userId, friendId);

    res.status(httpStatus.OK).send({});
})


//chang state follow
const changeFollow = catchAsync(async (req: RequestWithUser, res: Response)=> {

    const userId = req.user!.id
    const friendId = +req.params.id;

    await userService.changeFollow(userId, friendId);
    res.status(httpStatus.OK).send({});
})

export default {
    getOneUser,
    updateUser,
    updateAvt,
    updateBackgroundImage,
    sendRequestFriend,
    acceptFriend,
    refuseFriendRequest,
    changeFollow
}