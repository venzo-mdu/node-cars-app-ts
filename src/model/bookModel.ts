import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
    user_id: mongoose.Types.ObjectId;
    cars: mongoose.Types.ObjectId;
    user_availability: string;
    contact_no: string;

}

const BookSchema: Schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cars: { type: Schema.Types.ObjectId, ref: 'Cars', required: true },
    user_availability: { type: String, required: true },
    contact_no: { type: String, required: true, unique: true },
});

export default mongoose.model<IBook>('Book', BookSchema);