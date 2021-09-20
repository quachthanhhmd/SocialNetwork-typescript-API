import httpStatus from "http-status";
import ApiError from "../../utils/ApiError";

const NotFound = new ApiError(httpStatus.NOT_FOUND, "Conversation not found!");

export default {
    NotFound
}