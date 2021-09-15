import httpStatus from "http-status";

import ApiError from "../../utils/ApiError";

const UserNotFound = new ApiError(httpStatus.NOT_FOUND, "User not found!");

const UsernameExist = new ApiError(httpStatus.BAD_REQUEST, "Username already taken!");

const CreateUserFailed = new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Cannot create resource!");

const LoginFailed = new ApiError(httpStatus.UNAUTHORIZED, "Incorrect username or password!");


export default {
    UserNotFound,
    UsernameExist,
    CreateUserFailed,
    LoginFailed
};