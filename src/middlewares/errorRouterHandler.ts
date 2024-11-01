import {Request, Response, NextFunction} from 'express';
import AppError from "../utils/appError";

const errorRouterHandler = (req: Request, res: Response, next: NextFunction) => {
    const errorRouter = new AppError("Recurso inacessível, a rota solicitada é inválida.", 404);
    next(errorRouter);
}

export default errorRouterHandler;