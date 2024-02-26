const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
        type: String, required: true
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
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            review: {
                type: String,
            },
            rating: { type: Number },
            date: {
                type: Date,
                default: Date.now(),
            },
            order: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order"
            }
        },
    ],
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service"
        }
    ],
    isVerified: {
        type: Boolean, default: false,
    },
    emailToken: { type: String },
});

module.exports = mongoose.model('User', userSchema);