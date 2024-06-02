import { Schema, model, Document } from 'mongoose';

interface ISeed extends Document {
  name: string;
}

const seedSchema = new Schema<ISeed>({
  name: { type: String, required: true, unique: true },
});

const Seed = model<ISeed>('Seed', seedSchema);
export default Seed;
