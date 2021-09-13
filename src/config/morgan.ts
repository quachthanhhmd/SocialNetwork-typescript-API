import { Request, Response } from "express";
import morgan from "morgan";

import env from "./environments";
import logger from "./logger";


morgan.token('message', (req: Request, res: Response) => res.locals.errorMessage || '');

const getIpFormat = (): string => (env.TYPE === 'production' ? ':remote-addr - ' : '');
const successResponseFormat: string = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat: string = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
    skip: (req: Request, res: Response) => res.statusCode >= 400,
    stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
    skip: (req: Request, res: Response) => res.statusCode < 400,
    stream: { write: (message) => logger.error(message.trim()) },
});


export default {
    successHandler,
    errorHandler
}