import httpStatus  from 'http-status';

import express, { Request, Response, NextFunction } from 'express';


//----
import cors from "cors";

import morgan from './config/morgan';
import env from "./config/environments";

import routes from "./routes/v1/index";

import ApiError from "./utils/ApiError";


class App {
    private httpServer: any

    constructor() {
        this.httpServer = express()

        if (env.TYPE != "test") {
            this.httpServer.use(morgan.successHandler);
            this.httpServer.use(morgan.errorHandler);
        };

        // parse json request body
        this.httpServer.use(express.json());

        // parse urlencoded request body
        this.httpServer.use(express.urlencoded({ extended: true }));



        // enable cors
        this.httpServer.use(cors());
        this.httpServer.options('*', cors());

        this.httpServer.use("/", routes);
        
        //send back a 404 error for any unknown api request
        this.httpServer.use((req: Request, res : Response, next :NextFunction) => {
            next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
        });
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

export default App;