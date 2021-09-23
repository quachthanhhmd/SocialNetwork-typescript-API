import { IPagination } from './../interfaces/pagination.interface';
import Comment from "../models/comments";

/**
 * Create a comment for post 
 * @param userId 
 * @param postId 
 * @param content 
 */
const createComment = async (userId: number, postId: number, content: string) => {

    await Comment.create({
        userId: userId,
        postId: postId,
        content: content,
    })
}

const findCommentById = async (id: number) => {

    return await Comment.findByPk(id);
}




const findCommentPaging = async (postId: number, paging : IPagination) =>{

    
}

export default {
    createComment
}