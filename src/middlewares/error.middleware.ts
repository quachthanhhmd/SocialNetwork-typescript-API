import { Request, Response, NextFunction } from "express";

import httpStatus from "http-status";

import env from "../config/environments";
import logger from "../config/logger";
import ApiError from "../utils/ApiError";

const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.code ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};



const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    let { code, message } = err;
    if (env.TYPE === 'production' && !err.isOperational) {
        code = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR].toString();
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: code,
        message,
        ...(env.TYPE === 'development' && { stack: err.stack }),
    };

    if (env.TYPE === 'development') {
        logger.error(err);
    }

    res.status(code).send(response);
};


export {
    errorHandler,
    errorConverter,
}