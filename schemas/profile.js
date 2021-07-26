const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const profileSchema = new mongoose.Schema({
    userId: reqString,
    coins: {
        type: Number,
        default: 0,
    },
    xp: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 1,
    }
});

module.exports = mongoose.model('xpandlevels', profileSchema);