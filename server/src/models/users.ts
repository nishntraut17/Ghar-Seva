import mongoose, { Schema, Document, Types } from "mongoose";

interface IUser extends Document {
    name?: string;
    email: string;
    mobile?: string;
    address?: string;
    city?: string;
    password: string;
    profileImage?: string;
    role?: string;
    testimonials?: {
        customer: Types.ObjectId;
        review?: string;
        rating?: number;
        date?: Date;
        order?: Types.ObjectId;
    }[];
    services?: Types.ObjectId[];
    isVerified?: boolean;
    emailToken?: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    role: {
        type: String,
        default: 'consumer',
    },
    testimonials: [
        {
            customer: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            review: {
                type: String,
            },
            rating: { type: Number },
            date: {
                type: Date,
                default: Date.now,
            },
            order: {
                type: Schema.Types.ObjectId,
                ref: "Order"
            }
        },
    ],
    services: [
        {
            type: Schema.Types.ObjectId,
            ref: "Service"
        }
    ],
    isVerified: {
        type: Boolean,
        default: false,
    },
    emailToken: { type: String },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
