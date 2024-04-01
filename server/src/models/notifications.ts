import mongoose, { Schema, Document } from "mongoose";

interface INotification extends Document {
    title: string;
    body: string;
    consumer: mongoose.Schema.Types.ObjectId;
    seller: mongoose.Schema.Types.ObjectId;
    read: boolean;
}

const notificationSchema: Schema<INotification> = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    consumer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    read: { type: Boolean, default: false },
});

export default mongoose.model<INotification>("Notification", notificationSchema);