import asyncHandler from "../utils/asyncHandler";
import validationRepository from "../utils/validationRepository";
import logger from "../config/logger";

class GenericRepository <T> {
    
    private model: any;

    constructor(model: any){
        this.model = model;
    }

    findAll = async ():Promise<T[]> => {

        logger.info("Consultando todos os documentos registrados");
        const documents = await this.model.find();
        validationRepository.verifyExistData(documents,"Não há documentos registrados",404);
        return documents;
    };

    findById = asyncHandler(async(id:string):Promise<T | null> => {
        logger.info("Consultando um documento pelo ID.");
        const findByIdDocument = await this.model.findById(id);
        validationRepository.verifyExistData(findByIdDocument, "Documento não encontrado", 404);
        return findByIdDocument;
    });

    create = asyncHandler(async(data: T):Promise<T | null> => {
        logger.info("Criando um novo documento.")
        validationRepository.verifyExistData(data, "Não há dados para criar o documento", 400);
        const newDocument = new this.model(data);
        return await newDocument.save();
    });

    update = asyncHandler(async(id:string, data: T):Promise<T | null> => {
        logger.info("Atualizando documento pelo ID.");
        validationRepository.verifyExistData(data, "Ausência de dados para atualização.",404)
        const updateDocument= await this.model.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        validationRepository.verifyExistData(updateDocument, "Documento não encontrado. Não foi possível atualizar.",404);
        return updateDocument;
    });

    delete = asyncHandler(async(id:string):Promise<T | null> => {
        logger.info("Excluindo documento pelo ID.");
        const deleteDocument = await this.model.findByIdAndDelete(id);
        validationRepository.verifyExistData(deleteDocument, "Documento não encontrado. Não foi possível excluir.",404);
        return deleteDocument;
    });
}

export default GenericRepository;