import express from 'express';

//Swagger 
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from "swagger-jsdoc";
//----
import cors from "cors";
import morgan from "morgan";

import * as bodyParser from 'body-parser';


import { options } from "./docs/swaggerOption";


class App {
    private httpServer: any

    constructor() {
        this.httpServer = express()

        this.httpServer.use(bodyParser.urlencoded({ extended: true }));
        this.httpServer.use(bodyParser.json());

        const swaggerDocument = swaggerJsDoc(options);
        this.httpServer.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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