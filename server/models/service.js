const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Service', serviceSchema);