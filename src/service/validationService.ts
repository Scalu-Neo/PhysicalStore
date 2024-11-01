import { IStore } from "../models/storeModel";
import AppError from "../utils/appError";
import logger from "../config/logger";


class ValidationService {

    validateViaCepResponse = (responseData: any): void => {
        if(responseData.erro){
            logger.error("Erro na validação do Cep: Não há dados para o Cep informado");
            throw new AppError("Não há dados para o CEP informado", 404);
        }
    };
    
    validateAddressData = (addressData: any): void => {
    
        if(!addressData || !addressData.bairro || !addressData.localidade || !addressData.logradouro || !addressData.estado){
            logger.error("Erro na validação de endereço: Os dados relativos ao Cep estão incompletos.");
            throw new AppError("Dados do endereço do CEP estão incompletos", 400);
        }
    };
    
    isValidCep = (cep: string): void => {
        const cepFormat = /^\d{5}-?\d{3}$/;
        if(!cepFormat.test(cep)){
            logger.error("Erro na validação do Cep: O formato do cep é inválido.");
            throw new AppError("CEP inválido. Insira um CEP em um formato válido 'xxxxx-xxx'",400);
    
        }else if(!cep || typeof cep!== 'string'){
            logger.error("Erro na validação do Cep: Cep não informado.");
            throw new AppError("O CEP não foi informado, por favor inserir um CEP.", 400);
        }
    };
    
    verifyExistDataStore = (dataStore: {name: string, cep:string} ) =>{
        logger.error("Erro de ausência de dados: Nome e CEP são obrigatórios");
        if(!dataStore.name || !dataStore.cep){
            throw new AppError("Nome e Cep são obrigatórios", 404);
        }
    };
    
    verifyDataBaseStore = (storeDataBase: IStore[]): void => {
        if(storeDataBase.length===0){
            logger.error("Erro na consulta das lojas: Não há lojas registradas.");
            throw new AppError("Não há lojas registradas", 404);
        }
    };
    
    verifyFilterDistanceStore = (filterDistanceStore: any) => {
        if(filterDistanceStore.length===0){
            logger.error("Erro na consulta de lojas próximas: Não há lojas próximas em até 100km de distância");
            throw new AppError("Não há lojas próximas a uma distância de até 100km",404);
        }
    };

    validateResponseStatus = (response: any): void => {
        if(response.status!==200){
            throw new AppError("Erro ao realizar requisição. Verifique se o serviço está disponível", response.status);
        }
    };

    validateCoordinates = (coordinatesData: any) => {
        if(!coordinatesData.features || coordinatesData.features.length===0){
            throw new AppError("Não coordenadas para o endereço inserido", 404);
        }
    };
};

export default new ValidationService();