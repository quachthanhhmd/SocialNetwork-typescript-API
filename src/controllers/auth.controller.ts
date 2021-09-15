import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";


import catchAsync from "../utils/catchAsync";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import tokenService from "../services/token.service";

import { IUserInfo } from "../interfaces/user.interface";

const signUp = catchAsync(async (req: Request, res: Response) => {


    const user = await userService.createUser(req.body);

    return res.status(httpStatus.CREATED).send({ user });
});



const signIn = catchAsync( async (req: Request, res: Response) =>{

    const {username, password} = req.body;

    const user = await authService.loginWithUsernameAndPassword(username, password);


    const userInfo  = await userService.getInfoOfUser(user.id);


    const tokenCreate = await tokenService.generateTokenAuth(userInfo);

    
    Object.assign(userInfo, tokenCreate);
    

    return res.status(200).send({user: userInfo});
})

export default {
    signUp,
    signIn
}