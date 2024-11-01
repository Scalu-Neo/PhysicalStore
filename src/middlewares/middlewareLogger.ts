import {Request, Response, NextFunction} from 'express';
import logger from '../config/logger';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Requisição: ${req.method} ${req.url}`);
    next();
};

export default loggerMiddleware;