import mongoose, { Schema, Document } from 'mongoose';

export interface ICar extends Document {
  user_id: mongoose.Types.ObjectId;
  carname: string;
  model: string;
  year: string;
  price: string;
  image: string;
  carnumber: string;
  enginecapacity: string;
  tyre: string;
  fuel: string;
  kilometer: string;
  transmission:string;
  powersteering: string;
  noofowners: string;
  status: string;
}

const CarSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  carname: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String },
  carnumber: { type: String, required: true },
  enginecapacity: { type: String, required: true },
  tyre: { type: String, required: true },
  fuel: { type: String, required: true },
  kilometer: { type: String, required: true },
  transmission:{type:String,required:true},
  powersteering: { type: String, required: true },
  noofowners: { type: String, required: true },
  status: {
    type: String,
    default: 'pending', // Default value for the 'status' field
  },
});

export default mongoose.model<ICar>('Cars', CarSchema);