const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'complete', 'cancelled'],
        default: 'pending',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    disableReview: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('Order', orderSchema);