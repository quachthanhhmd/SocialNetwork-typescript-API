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
import { IUser } from './../interfaces/user.interface';

//Declare interface 
interface RequestWithUser extends Request {
    user: IUser;
}


const signUp = catchAsync(async (req: Request, res: Response) => {


    const user = await userService.createUser(req.body);

    const tokens: object = await tokenService.generateTokenAuth(user!.id);
    const tokenVerifyEmail: string = await tokenService.generateTokenVerify(user!.id, TYPETOKEN.VERIFY_EMAIL);


    await Nodemailer.sendMailVerify(req, user!.username, tokenVerifyEmail);

    return res.status(httpStatus.CREATED).send({ user, tokens });
});


/**
 * User login
 */
const signIn = catchAsync( async (req: Request, res: Response) =>{

    const {username, password} = req.body;

    const user = await authService.loginWithUsernameAndPassword(username, password);

    const userInfo  = await userService.getInfoOfUser(user.id);

    const tokenCreate = await tokenService.generateTokenAuth(userInfo.id);
    
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




//Send verify email again
//When register, you need to save user in req 
const sendEmailVerifyAgain = catchAsync( async (req: RequestWithUser, res: Response) =>{

    const user: IUser  = req.user;

    if (!user) throw UserError.UserNotFound;

    const generateTokenVerifyEmail = await tokenService.generateTokenVerify(user!.id, TYPETOKEN.VERIFY_EMAIL);

    await Nodemailer.sendMailVerify(req, user!.username, generateTokenVerifyEmail);

    res.status(httpStatus.OK).send("Send email verify success");
})



//refresh token
const refreshToken = catchAsync( async (req: Request, res: Response) =>{

    const refreshToken: string  = req.body.refreshToken;

    const token = await tokenService.verifyToken(refreshToken, TYPETOKEN.REFRESH);

    //generate new token
    const newToken = await tokenService.generateTokenAuth(token!.userId);

    //await tokenService.removeToken(refreshToken, TYPETOKEN.REFRESH);

    return res.status(httpStatus.OK).send(newToken);
})

//forgot password
const forgotPassword = catchAsync( async (req: Request, res: Response) : Promise<void> =>{

    const { username } = req.body;

    const user = await userService.findUserbyUsername(username);

    if (!user)
        throw UserError.UserNotFound;

    const generateForgotPassword = await tokenService.generateTokenVerify(user.id, TYPETOKEN.RESET_PASSWORD);

    //send to email
    await Nodemailer.sendMailForgotPassword(req, username, generateForgotPassword);

    console.log(generateForgotPassword);

    res.status(httpStatus.OK).send("Generate token sucess!")
})

//reset password
const resetPassword = catchAsync( async (req: Request, res: Response): Promise<void> =>{

    const { resetToken, password} = req.body;

    const token = await tokenService.verifyToken(resetToken, TYPETOKEN.RESET_PASSWORD);

    await userService.ChangePasswordById(token.userId, password);

    res.status(httpStatus.OK).send("Reset password success!");

})

export default {
    signUp,
    signIn,
    logout,
    verifyAccount,
    sendEmailVerifyAgain,
    refreshToken,
    forgotPassword,
    resetPassword
}