import httpStatus from "http-status";
import ApiError from "../../utils/ApiError";


const UnAuthenticated =  new ApiError(httpStatus.UNAUTHORIZED, "Please autheticated!");



export default {
    UnAuthenticated
}

