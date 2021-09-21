import { ICreatePost } from './../interfaces/post.interface';
import { Request, Response, NextFunction  } from "express"; 
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";

import {IUserInfoSummary} from "../interfaces/user.interface";

import postService from "../services/post.service";

import AuthError from "../constants/apiError/auth.constant";


interface RequestWithUserAndBody extends Request {
    user: IUserInfoSummary,
    body: ICreatePost,
}

const createPost = catchAsync(async (req: RequestWithUserAndBody, res: Response)=> {

    const userId = req.user!.id;
    const contentPost = req.body;

    await postService.createPost(userId, contentPost);


    res.status(httpStatus.OK);
})


const getOnePost = catchAsync(async (req: Request, res: Response) => {

    const postId :number = +req.params.postId;

    const post = await postService.findPostById(postId);

    if (!post) throw  AuthError.NotFound;

    res.status(httpStatus.OK).send(post);
})

export default {
    createPost,
    getOnePost
}