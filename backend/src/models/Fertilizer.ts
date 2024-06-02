import { Schema, model, Document } from 'mongoose';

interface IFertilizer extends Document {
  name: string;
  compatibleSeeds: string[];
}

const fertilizerSchema = new Schema<IFertilizer>({
  name: { type: String, required: true, unique: true },
  compatibleSeeds: { type: [String], required: true },
});

const Fertilizer = model<IFertilizer>('Fertilizer', fertilizerSchema);
export default Fertilizer;
