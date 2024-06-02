import { Schema, model, Model } from 'mongoose';

interface IFarmerOrder {
  farmerName: string;
  landSize: number;
  totalAmount: string;
  fertilizer?: string;
  seed?: string; 
  fertilizerQuantity?: number; 
  seedQuantity?: number; 
  dateCreated: Date; 
  status: 'pending' | 'approved' | 'rejected';
}

const farmerOrderSchema = new Schema<IFarmerOrder>({
  farmerName: { type: String, required: true },
  landSize: { type: Number, required: true },
  totalAmount: { type: String, required: true },
  fertilizer: { type: String, required: false },
  seed: { type: String, required: false },
  fertilizerQuantity: { type: Number, required: false },
  seedQuantity: { type: Number, required: false },
  dateCreated: { type: Date, default: Date.now }, 
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});


export const FarmerOrder: Model<IFarmerOrder> = model<IFarmerOrder>('FarmerOrder', farmerOrderSchema);
