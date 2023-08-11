import mongoose, { Schema, Document } from 'mongoose';

export interface ICar extends Document {
  user_id: mongoose.Types.ObjectId;
  carname: string;
  model: string;
  year: string;
  price: string;
}

const CarSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  carname: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  price: { type: String, required: true },
  status: {
    type: String,
    default: 'pending', // Default value for the 'role' field
  },
});

export default mongoose.model<ICar>('Cars', CarSchema);