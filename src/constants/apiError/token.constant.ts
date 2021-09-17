import httpStatus from "http-status";

import ApiError from "../../utils/ApiError";

const InvalidRequestTokenError = new ApiError(httpStatus.FORBIDDEN, "Invalid request token provided");

const VerifyAccountNotSuccess =  new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");

const TokenNotFound = new ApiError(httpStatus.NOT_FOUND, "Token not found!");


export default {
    InvalidRequestTokenError,
    VerifyAccountNotSuccess,
    TokenNotFound,
}