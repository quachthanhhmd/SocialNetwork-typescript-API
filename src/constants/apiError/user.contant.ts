import httpStatus from "http-status";

import ApiError from "../../utils/ApiError";

const UserNotFound = new ApiError(httpStatus.NOT_FOUND, "User not found!");

const UsernameExist = new ApiError(httpStatus.BAD_REQUEST, "Username already taken!");

const CreateUserFailed = new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Cannot create resource!");

export default {
    UserNotFound,
    UsernameExist,
    CreateUserFailed
};