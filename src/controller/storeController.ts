
import { NextFunction, Request, Response } from 'express';
import StoreService from '../service/storeService';
import asyncHandler from '../utils/asyncHandler';
import storeRepository from '../repository/storeRepository';
import { IStore } from '../models/storeModel';


class StoreController {
    
    GetAllStore = asyncHandler(async(req:Request, res:Response, next:NextFunction):Promise<void> => {

        const stores: IStore[] = await storeRepository.findAll();
        res.status(200).json(stores);

    });

    GetStoreById = asyncHandler(async(req:Request, res:Response, next:NextFunction):Promise<void> => {
        
        const {id} = req.params;
        const getStore: IStore = await storeRepository.findById(id, null, null);
        res.status(200).json({
            message: "Loja selecionada",
            getStore,
        });

    });

    PostStore = asyncHandler(async(req:Request, res:Response, next:NextFunction):Promise<void>=> {
        
        const {name, cep} = req.body;
        const newStore: IStore = await StoreService.createStore({ name, cep }, null, null);
        res.status(201).json(newStore);

    });

    GetAllStoreNearby = asyncHandler(async(req:Request, res:Response, next:NextFunction):Promise<void> => {
        
        const {cep} = req.query;
        const nearbyStores = await StoreService.ShowStoreNearby(cep as string, null, null);
        res.status(200).json({
            message:"Lojas próximas ao CEP informado em um raio de 100km",
            nearbyStores
        });

    });

    DeleteStoreById = asyncHandler(async(req:Request, res:Response, next:NextFunction):Promise<void> => {
        
        const {id} = req.params;
        const deleteStore: boolean = await storeRepository.delete(id,null, null);
        res.status(200).json({message:"Loja excluída com sucesso."});

    });

    UpdateStoreById = asyncHandler(async(req:Request, res:Response, next:NextFunction):Promise<void> => {
        
        const {id} = req.params;
        const updateData: Partial<IStore> = req.body;

        const updateStore= await storeRepository.update(id, updateData, null);
        res.status(200).json({
            message: "Loja atualizada com sucesso.",
            data: updateStore,
        });
    });


}
export default new StoreController();