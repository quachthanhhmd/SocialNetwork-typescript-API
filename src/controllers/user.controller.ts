import httpStatus from "http-status";

import {Request, Response} from "express";

import userService from "../services/user.service";
import catchAsync from "../utils/catchAsync";

import UserError from "../constants/apiError/user.contant";


//Get one user and use Id to get user
const getOneUser = catchAsync( async (req: Request, res: Response) =>{

    const id = +req.params.id;

    console.log(id);
    const user = userService.getFullUserInfo(id);

    if (!user) throw UserError.UserNotFound;

    res.status(httpStatus.OK).send(user);
})

export default {
    getOneUser
}