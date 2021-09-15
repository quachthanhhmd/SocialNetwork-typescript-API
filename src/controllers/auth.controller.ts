import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";


import catchAsync from "../utils/catchAsync";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import tokenService from "../services/token.service";

import { IUserInfo } from "../interfaces/user.interface";

import authError from "../constants/apiError/auth.constant";

const signUp = catchAsync(async (req: Request, res: Response) => {


    const user = await userService.createUser(req.body);

    return res.status(httpStatus.CREATED).send({ user });
});



const signIn = catchAsync( async (req: Request, res: Response) =>{

    const {username, password} = req.body;

    const user = await authService.loginWithUsernameAndPassword(username, password);


    const userInfo  = await userService.getInfoOfUser(user.id);


    const tokenCreate = await tokenService.generateTokenAuth(userInfo);
    

    return res.status(httpStatus.CREATED).send({user: userInfo, token: tokenCreate});
})


/**
 * Logout controllers
 * Logout only use when user login into server
 */
const logout = catchAsync( async (req: Request, res: Response) =>{

    //Be sure to user has been login since I had code middleware.
    await authService.logoutAuth(req.body.refreshToken);

    req.logOut();

    res.status(httpStatus.OK).send("Success logout");
})


export default {
    signUp,
    signIn,
    logout
}