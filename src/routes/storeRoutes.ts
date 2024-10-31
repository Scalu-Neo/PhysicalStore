import { Router } from "express";
import storeController from '../controller/storeController';

const router = Router();

router.get('/storeNearby', storeController.GetAllStoreNearby)
router.get('/allStore', storeController.GetAllStore);
router.get('/getStore/:id', storeController.GetStoreById)
router.post('/createStore', storeController.PostStore);
router.delete('/deleteStore/:id', storeController.DeleteStoreById);
router.put('/updateStore/:id', storeController.UpdateStoreById);


export default router;