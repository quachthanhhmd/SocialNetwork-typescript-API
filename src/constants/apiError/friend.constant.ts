import httpStatus from "http-status";
import ApiError from "../../utils/ApiError";

const FriendNotFound = new ApiError(httpStatus.NOT_FOUND, "Friend not found!");

const FriendExist = new ApiError(httpStatus.BAD_REQUEST, "Friend already existed");

const UnSelfAccept = new ApiError(httpStatus.BAD_REQUEST, "User is not self-accpectable");


export default {
    FriendNotFound,
    FriendExist,
    UnSelfAccept
}