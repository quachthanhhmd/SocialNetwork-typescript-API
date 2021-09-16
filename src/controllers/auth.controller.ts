import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";


import catchAsync from "../utils/catchAsync";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import tokenService from "../services/token.service";

import UserError from "../constants/apiError/user.contant";

import env from "../config/environments";
import tokenError from "../constants/apiError/token.constant";
import Nodemailer from "../config/nodemailer";

import { TYPETOKEN } from "../constants/token.constant";

const signUp = catchAsync(async (req: Request, res: Response) => {


    const user = await userService.createUser(req.body);

  
    const token: string = await tokenService.generateTokenVerifyEmail(user!.id);


    await Nodemailer.sendMailVerify(req, user!.username, token);

    return res.status(httpStatus.CREATED).send({ user, token });
});


/**
 * User login
 */
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


//Use token which has been send through email to verify account.
const verifyAccount  = catchAsync( async (req: Request, res: Response) =>{

    const token = req.query.token;

    if (typeof token === 'string') {


        const userToken = await tokenService.verifyToken(token, TYPETOKEN.VERIFY_EMAIL);

    
        if (!userToken) {
            throw tokenError.VerifyAccountNotSuccess;
        }
        //Check again wonder if user has been deleted in DB or not
        const user = await userService.findUserById(userToken!.userId);

        if (!user){
            throw UserError.UserNotFound;
        }

        await userService.updateUser(userToken!.userId, {isVerified : true});

        return res.status(httpStatus.OK).send("Verify success!");
    }

    //I had validation before, therefore it never exists (No check)
})


export default {
    signUp,
    signIn,
    logout,
    verifyAccount
}