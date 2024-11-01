import axios from "axios";
import { IStore, StoreModel } from "../models/storeModel";
import { AddressModel, IAddress } from "../models/addressModel";
import storeRepository from "../repository/storeRepository";
import ValidationService from "./validationService";
import logger from "../config/logger";
import asyncHandler from "../utils/asyncHandler";


const API_KEY = '2e32f33a3579447eb198e5a543aa4dde';

class StoreService{

    createStore = asyncHandler(async(dataStore: {name: string, cep: string}) => {
        
        logger.info("Criando loja com nome e Cep.");
        const {name, cep} = dataStore;
    
        ValidationService.isValidCep(cep);
        ValidationService.verifyExistDataStore({name, cep});
    
        logger.info("Consultando o endereço via Cep");
        const response: any = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const addressData: any = response.data;
    
        ValidationService.validateViaCepResponse(addressData);
    
        logger.info(`Resposta da API viaCEP`);
        ValidationService.validateAddressData(addressData);
    
        const addressString: string = `${addressData.logradouro}, ${addressData.bairro},
        ${addressData.localidade}, ${addressData.estado}, ${addressData.cep}`;
    
        logger.info("Endereço formato para geocodificação");
        const {latitude, longitude} = await this.getCoordinates(addressString, null, null);
    
        const newAddress: IAddress = {
            cep,
            bairro: addressData.bairro,
            localidade: addressData.localidade,
            logradouro: addressData.logradouro,
            estado: addressData.estado,
            latitude,
            longitude,
            
        } as IAddress;
    
        const newStore: IStore = {
            name, 
            address: newAddress,
        } as IStore;
    
        logger.info("Loja criada na base de dados");
        const createStore: IStore = await storeRepository.create(newStore, null, null);
        return createStore;
    });
    
    
    ShowStoreNearby = asyncHandler(async(cep:string)=> {
    
        logger.info(`Solicitação para buscar lojas próximas ao CEP: ${cep}`);
    
        ValidationService.isValidCep(cep);
        const response: any = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const fullAddress: any = response.data;
        
        ValidationService.validateViaCepResponse(fullAddress);
        ValidationService.validateAddressData(fullAddress);
    
        const addressString: string = `${fullAddress.logradouro}, ${fullAddress.bairro}, 
        ${fullAddress.localidade}, ${fullAddress.estado} - ${fullAddress.cep}`;
        logger.info(`Endereço completo obtido: ${addressString}`);
    
        const { latitude, longitude } = await this.getCoordinates(addressString, null, null);
        logger.info(`Coordenadas relativas ao endereço obtido: ${latitude}, ${longitude}`);
    
        const storesDataBase: IStore[] = await storeRepository.findAll();
        logger.info(`Consultando lojas registradas na base de dados`);
    
        ValidationService.verifyDataBaseStore(storesDataBase);
    
        logger.info("Filtrando propriedades desejadas no array do tipo Store");
        const filterPropertiesStores = storesDataBase.map(store => ({
            name: store.name,
            address: store.address
        }));
        
        logger.info("Calculando a distância entre o CEP informado e as lojas");
        const calculeDistanceStores = filterPropertiesStores.map(store => {
            const distance: number = this.CalculateDistance(latitude, longitude, store.address.latitude, 
            store.address.longitude);
            return {...store, distance: parseFloat(distance.toFixed(2))};
        });
    
        logger.info(`Filtrando e ordenando as lojas a partir da distância`);
        const filterDistanceStores = calculeDistanceStores
        .filter(store=> store.distance <=100)
        .sort((a,b)=> a.distance - b.distance);
    
        ValidationService.verifyFilterDistanceStore(filterDistanceStores);
    
        logger.info(`Retornando lojas encontradas a uma distância de até 100km`);
        return filterDistanceStores;
    });
    
    getCoordinates = asyncHandler(async(addressText: string):Promise<{latitude:number, longitude:number}> => {

        const response: any = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressText)}&apiKey=${API_KEY}`);
        
        ValidationService.validateResponseStatus(response);
        const coordinatesData: any = await response.data;

        ValidationService.validateCoordinates(coordinatesData);
    
        const {properties: {lon: longitude, lat: latitude}} = coordinatesData.features[0];
    
        return { latitude, longitude};
    });
    
    private CalculateDistance =(latInitial: number, lonInitial: number, latFinal: number, lonFinal: number): number => {
        
        const rayEarth: number = 6371;
    
        const toRadians = (degrees: number) => degrees * (Math.PI/180);
    
        const distanceLat: number = toRadians(latFinal - latInitial);
        const distanceLon: number = toRadians(lonFinal - lonInitial); 
    
        const a = Math.sin(distanceLat / 2) ** 2 + Math.cos(toRadians(latInitial)) * Math.cos(toRadians(latFinal)) *
        Math.sin(distanceLon / 2) ** 2;
    
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        return c * rayEarth;
    }
}

export default new StoreService();
