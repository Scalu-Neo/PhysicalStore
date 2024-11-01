import { Request,Response, NextFunction } from 'express';
import AppError from '../utils/appError';

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro no servidor';
    res.status(statusCode).json({message});
}

export default errorHandler;