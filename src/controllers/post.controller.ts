
import { Request, Response, NextFunction  } from "express"; 
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";

import postService from "../services/post.service";
import AuthError from "../constants/apiError/auth.constant";

import {IUserInfoSummary} from "../interfaces/user.interface";
import { ICreatePost } from '../interfaces/post.interface';
import { ISearchPagination} from '../interfaces/pagination.interface';


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


// interface RequestWithUserPaging extends Request<any, any, any, ISearchPagination> {

//     //declare user to be sure to login 
//     user: IUserInfoSummary,
// }

//get post pagination
const getPostList = catchAsync(async (req: Request<any, any, any, ISearchPagination>, res: Response) => {


    const postList = await postService.findPostList(req.query);

    res.status(httpStatus.OK).send(postList);
})


export default {
    createPost,
    getOnePost,
    getPostList
}