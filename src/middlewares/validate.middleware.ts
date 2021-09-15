import { NextFunction } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import Joi from "joi";
import httpStatus from "http-status";
import pick from "../utils/pick";
import ApiError from "../utils/ApiError";

export default (schema: object) => (req: Request, res: Response, next: NextFunction) =>{


    const spreadSchema = pick(schema, ["params", "query", "body"]);

    const getObject = pick(req, Object.keys(spreadSchema)); 
  
    const { value, error } = Joi.compile(spreadSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(getObject)


    if (error) {
        const errorMessage: string = error.details.map((details) => details.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value);

    return next();
}