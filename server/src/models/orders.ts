import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
    status: string;
    groupId: string;
    user: mongoose.Schema.Types.ObjectId;
    serviceProvider: mongoose.Schema.Types.ObjectId;
    service: mongoose.Schema.Types.ObjectId;
    date: string;
    time: string;
    disableReview: boolean;
    fees: number;
    subServices: string[];
}

const orderSchema: Schema<IOrder> = new Schema({
    status: { type: String, default: 'user requests' },
    groupId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    disableReview: { type: Boolean, default: false },
    fees: { type: Number, default: 0 },
    subServices: [{ type: String }]
});

export default mongoose.model<IOrder>('Order', orderSchema);