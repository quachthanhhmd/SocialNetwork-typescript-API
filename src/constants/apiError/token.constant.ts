import httpStatus from "http-status";

import ApiError from "../../utils/ApiError";

const InvalidRequestTokenError = new ApiError(httpStatus.FORBIDDEN, "Invalid request token provided");

const VerifyAccountNotSuccess =  new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");

export default {
    InvalidRequestTokenError,
    VerifyAccountNotSuccess
}