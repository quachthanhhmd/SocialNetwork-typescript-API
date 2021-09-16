import httpStatus from "http-status";
import ApiError from "../../utils/ApiError";


const UnAuthenticated =  new ApiError(httpStatus.UNAUTHORIZED, "Please autheticated!");

const NotFound = new ApiError(httpStatus.NOT_FOUND, "Not found!");

const SendMailFailed = new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Cannot send mail!");


export default {
    UnAuthenticated,
    NotFound,
    SendMailFailed,
}

