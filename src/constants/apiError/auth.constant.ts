import httpStatus from "http-status";
import ApiError from "../../utils/ApiError";


const UnAuthenticated =  new ApiError(httpStatus.UNAUTHORIZED, "Please autheticated!");

const NotFound = new ApiError(httpStatus.NOT_FOUND, "Not found!");


export default {
    UnAuthenticated,
    NotFound,
}

