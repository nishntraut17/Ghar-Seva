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
    experience: {
        type: Number,
        default: 1,
    }
});

module.exports = mongoose.model('User', userSchema);