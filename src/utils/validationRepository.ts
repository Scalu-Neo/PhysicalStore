import AppError from "./appError";
import logger from "../config/logger";

class ValidationRepository{

    verifyExistData = (data: any, erroMessage: string, status:number):void => {
        if(!data){
            logger.info(erroMessage);
            throw new AppError(erroMessage,status);
        }
    };
}

export default new ValidationRepository();