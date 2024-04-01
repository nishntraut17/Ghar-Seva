import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
    name?: string;
    description?: string;
    image?: string;
    subServices?: string[];
    serviceProviders?: mongoose.Schema.Types.ObjectId[];
}

const serviceSchema: Schema<IOrder> = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    subServices: [{ type: String }],
    serviceProviders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

export default mongoose.model<IOrder>('Service', serviceSchema);