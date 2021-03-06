
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";

import postService from "../services/post.service";
import commentService from '../services/comment.service';

import AuthError from "../constants/apiError/auth.constant";

import { IUserInfoSummary } from "../interfaces/user.interface";
import { ICreatePost } from '../interfaces/post.interface';
import { IPagination, ISearchPagination } from '../interfaces/pagination.interface';
import { IUpdateEmoij } from '../interfaces/emoij.interface';
import { IUpdatePost } from '../interfaces/post.interface';



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


//delete Post
const deletePost = catchAsync(async (req: RequestWithUser, res: Response) => {

    const postId: number = +req.params.postId;
    const userId: number = req.user!.id;

    const isBelongto = await postService.checkBelongto(userId, postId);

    if (!isBelongto)
        throw AuthError.Forbidden;

    await postService.deletePost(postId);

    res.status(httpStatus.OK).send({});
})

interface RequestWithUserAndEmoij extends Request {
    user: IUserInfoSummary,
    body: IUpdateEmoij,
}

//Emoij for pos
const updateEmoij = catchAsync(async (req: RequestWithUserAndEmoij, res: Response) => {

    const userId = req.user!.id;
    const postId: number = +req.params.postId;

    await postService.ChangeStateEmoij(userId, postId, req.body);

    res.status(httpStatus.OK).send({});
});

//get info of user who emoij in the post
const getUserEmoijList = catchAsync(async (req: Request, res: Response) => {

    const postId: number = +req.params.postId;

    const postEmoijList = await postService.getUserEmoijList(postId);

    res.status(httpStatus.OK).send(postEmoijList);
})

//create comments for post
interface RequestWithUserUpdateComment extends Request {
    user: IUserInfoSummary,
    body: {
        content: string
    }
}

const createComment = catchAsync(async (req: RequestWithUserUpdateComment, res: Response) => {

    const postId: number = +req.params.postId;
    const userId: number = req.user!.id;

    const newComment = await commentService.createComment(userId, postId, req.body!.content);

    res.status(httpStatus.CREATED).send(newComment);
})



const getUserCommentList = catchAsync(async (req: Request<any, any, any, IPagination>, res: Response) => {

    const postId: number = +req.params.postId;

    const userCommentList = await postService.getCommentUserList(postId, req.query);

    res.status(httpStatus.OK).send(userCommentList);
})




//change content of comment
const updateComment = catchAsync(async (req: RequestWithUserUpdateComment, res: Response) => {

    const commentId: number = +req.params.commentId;
    const userId: number = req.user!.id;

    const isBelongto = await commentService.isBelongtoUser(userId, commentId);

    if (!isBelongto) throw AuthError.Forbidden;

    await commentService.updateComment(commentId, req.body.content);

    res.status(httpStatus.OK).send({});
});


interface RequestWithUser extends Request {

    user: IUserInfoSummary,
}

//delete comment
const deleteComment = catchAsync(async (req: RequestWithUser, res: Response) => {

    const commentId = +req.params.commentId;
    const userId = req.user!.id;

    const checkBelongto = await commentService.isBelongtoUser(userId, commentId);

    if (!checkBelongto) throw AuthError.Forbidden;

    await commentService.deleteComment(commentId);

    res.status(httpStatus.OK).send({});
})

export default {
    createPost,
    getOnePost,
    getPostList,
    updatePost,
    deletePost,
    updateEmoij,
    getUserEmoijList,
    createComment,
    getUserCommentList,
    updateComment,
    deleteComment
}