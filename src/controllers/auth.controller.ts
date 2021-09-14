import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";


import catchAsync from "../utils/catchAsync";
import userService from "../services/user.service";
import tokenService from "../services/token.service";

const signUp = catchAsync(async (req: Request, res: Response) => {


    const user = await userService.createUser(req.body);

    return res.status(httpStatus.CREATED).send({ user });
});


export default {
    signUp
}