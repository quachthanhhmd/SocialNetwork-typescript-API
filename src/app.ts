import httpStatus  from 'http-status';
import passport from "passport";

import express, { Request, Response, NextFunction } from 'express';


//----
import cors from "cors";

import morgan from './config/morgan';
import env from "./config/environments";
import routes from "./routes/v1/index";
import ApiError from "./utils/ApiError";


import passportConfig from "./config/passport";


class App {
    public httpServer: any

    constructor() {
        this.httpServer = express()


        // parse json request body
        this.httpServer.use(express.json());

        // parse urlencoded request body
        this.httpServer.use(express.urlencoded({ extended: true }));



        // enable cors
        this.httpServer.use(cors());
        this.httpServer.options('*', cors());


        this.httpServer.use(passport.initialize());
        passport.use('jwt', passportConfig);

        this.httpServer.use("/", routes);
        
        //send back a 404 error for any unknown api request
        this.httpServer.use((req: Request, res : Response, next :NextFunction) => {
            next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
        });

        this.httpServer.use(morgan.successHandler);
        this.httpServer.use(morgan.errorHandler);
    }

    public Start = (port: number) => {
        return new Promise((resolve, reject) => {

            this.httpServer.listen(
                port,
                () => {
                    resolve(port)
                })
                .on('error', (err: object) => reject(err));
        })
    }
}

export default new App;