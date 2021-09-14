import httpStatus from "http-status";

import ApiError from "../../utils/ApiError";

const InvalidRequestTokenError = new ApiError(httpStatus.FORBIDDEN, "Invalid request token provided");

export default {
    InvalidRequestTokenError
}