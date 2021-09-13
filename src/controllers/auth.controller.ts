import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import catchAsync from "../utils/catchAsync";
import userService from "../services/user.service";

const signUp = catchAsync(async (req: Request, res: Response) => {

    const {
        username,
        password,
    } = req.body;




    const user = await userService.findUserbyUsername(username);
    if (!user) {

    }


    console.log("SIGN UP COMPLETE!!");


});
