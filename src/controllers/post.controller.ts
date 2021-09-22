import { IUpdateEmoij } from './../interfaces/emoij.interface';
import { IUpdatePost } from './../interfaces/post.interface';

import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";

import postService from "../services/post.service";
import AuthError from "../constants/apiError/auth.constant";

import { IUserInfoSummary } from "../interfaces/user.interface";
import { ICreatePost } from '../interfaces/post.interface';
import { ISearchPagination } from '../interfaces/pagination.interface';


interface RequestWithUserAndBody extends Request {
    user: IUserInfoSummary,
    body: ICreatePost,
}

const createPost = catchAsync(async (req: RequestWithUserAndBody, res: Response) => {

    const userId = req.user!.id;
    const contentPost = req.body;

    const newPost = await postService.createPost(userId, contentPost);


    res.status(httpStatus.CREATED).send(newPost);
})


const getOnePost = catchAsync(async (req: Request, res: Response) => {

    const postId: number = +req.params.postId;

    const post = await postService.findPostById(postId);

    if (!post) throw AuthError.NotFound;

    res.status(httpStatus.OK).send(post);
})


interface RequestPaging extends Request<any, any, any, ISearchPagination> {

    user: IUserInfoSummary,
}



//get post pagination
const getPostList = catchAsync(async (req: RequestPaging, res: Response) => {


    const postList = await postService.findPostList(req.query);

    res.status(httpStatus.OK).send(postList);
})


interface RequestWithUserAndUpdatePost extends Request {
    user: IUserInfoSummary,
    body: IUpdatePost,
}
//update post
const updatePost = catchAsync(async (req: RequestWithUserAndUpdatePost, res: Response) => {

    const postId: number = +req.params.postId;
    const body: IUpdatePost = req.body;

    const checkOwnPost = await postService.checkOwnPost(req.user!.id, postId);

    if (!checkOwnPost)
        throw AuthError.Forbidden;
    await postService.updatePost(postId, body);
    res.status(httpStatus.OK).send({});
})


interface RequestWithUserAndEmoij extends Request {
    user: IUserInfoSummary,
    body: IUpdateEmoij,
}

//Emoij for pos
const updateEmoij =catchAsync(async (req:RequestWithUserAndEmoij, res: Response)=> {

    const userId = req.user!.id;
    const postId: number = +req.params.postId;

    await postService.ChangeStateEmoij(userId, postId, req.body);

    res.status(httpStatus.OK).send({});
});

//get info of user who emoij in the post
const getUserEmoijList =  catchAsync(async (req: Request, res: Response) => {

    const postId: number = +req.params.postId;

    const postEmoijList = await postService.getUserEmoijList(postId);

    res.status(httpStatus.OK).send(postEmoijList);
})


export default {
    createPost,
    getOnePost,
    getPostList,
    updatePost,
    updateEmoij,
    getUserEmoijList
}