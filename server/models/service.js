const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    images: [{
        type: String,
    }],
    serviceProviders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Service', serviceSchema);