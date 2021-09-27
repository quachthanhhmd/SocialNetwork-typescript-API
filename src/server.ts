import { createServer } from 'http';

import app from './app'

import logger from "./config/logger";

import { socketConnect } from "./socket";



const port = parseInt(process.env.PORT || '3000')


const server = createServer(app.httpServer);

socketConnect(server);



server.listen(port, () => {
    logger.info(`Listening to port ${port}`);
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error : any) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});

export default server;