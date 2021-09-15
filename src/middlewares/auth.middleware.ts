import {Request, Response, NextFunction} from "express";

import passport from "passport";
import ApiError from "../constants/apiError/auth.constant";
import Users from "../models/user";

const verifyCallback = (req: Request, resolve: any, reject: any) => async (err: string, user: Users, info : any) => {
    console.log(err, user, info);

    if (err || info || !user)
        return reject(ApiError.UnAuthenticated);

    req.user = user;
    

    resolve();
}

/**
 * Function to autheticate role for user when try to connect any url which must use authetication.
 * Remenber that if you want to have more Role, you can add an array as a parameter in function below
 * And pass them in the head function. 
 */
const authenticate = () => (req: Request, res: Response, next: NextFunction) => {

    console.log("Toi day roi");
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
      })
        .then(() => next())
        .catch((err) => next(err));
};

export default authenticate;
