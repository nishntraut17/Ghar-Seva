const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    status: {
        type: String,
        default: 'user requests',
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
    },
    fees: {
        type: Number,
        default: 0,
    },
    subServices: [{
        type: String
    }]
})

module.exports = mongoose.model('Order', orderSchema);