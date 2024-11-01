import mongoose, {Document, Schema } from 'mongoose';
import { IAddress } from './addressModel';

export interface IStore extends Document {
    name: string;
    address: IAddress;
}

const storeSchema = new Schema<IStore>({
    name: {type: String, required: true },
    address: {type: Schema.Types.Mixed, required: true},
});

export const StoreModel = mongoose.model<IStore>('Store', storeSchema);