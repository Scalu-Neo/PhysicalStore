import { IStore, StoreModel } from "../models/storeModel";
import GenericRepository from "../repository/genericRepository"


const storeRepository: GenericRepository<IStore> = new GenericRepository<IStore>(StoreModel);

export default storeRepository;