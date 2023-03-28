const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    description: String,
    dateDebut: {
        type: Date,
        default: Date.now
    },
    dateFin: {
        type: Date,
        default: Date.now
    },
    lieu: String,
    image: String,
    private: Boolean,
    membres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'utilisateurs'
    }]
}, {
    collection: 'evenements',
    minimize: false,
    versionKey: false
});

module.exports = Schema;