import { IPagination } from './../interfaces/pagination.interface';
import Comment from "../models/comments";

/**
 * Create a comment for post 
 * @param {number} userId 
 * @param {number} postId 
 * @param {string} content 
 */
const createComment = async (userId: number, postId: number, content: string): Promise<Comment> => {

    return await Comment.create({
        userId: userId,
        postId: postId,
        content: content,
    })
}

const findCommentById = async (id: number) => {

    return await Comment.findByPk(id);
}

/**
 * check wonder if this comment belongs to user or not
 * @param {number}userId 
 * @param {number} commentId 
 * @returns 
 */
const isBelongtoUser = async (userId: number, commentId: number): Promise<Boolean> => {

    const comment = await Comment.findOne({
        where: {
            id: commentId,
        }
    })

    if (!comment) return false;

    return comment.userId === userId ? true : false;
}

/**
 * Update content of commen, be sure to check belong to before call this function
 * @param commentId 
 * @param content 
 */
const updateComment = async (commentId: number, content: string): Promise<void> => {

    await Comment.update(
        {
            content: content,
            isChange: true,
        },
        {
            where: {
                id: commentId
            }
        }
    )
}

const deleteComment = async (commentId: number) => {

    await Comment.destroy({
        where: {
            id: commentId,
        }
    })
}


export default {
    createComment,
    isBelongtoUser,
    updateComment,
    deleteComment,
}