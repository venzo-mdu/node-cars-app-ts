import mongoose, { Schema, Document } from 'mongoose';

export interface IChecker extends Document {
    user_id: mongoose.Types.ObjectId;
    carname: string;
    model: string;
    year: string;
    price: string;
  }
  
  const CheckerSchema: Schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    carname: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    price: { type: String, required: true },
  });
  
  export default mongoose.model<IChecker>('Checker', CheckerSchema);