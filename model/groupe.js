const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    description: String,
    icon: String,
    image: String,
    type: String,
    membres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'utilisateurs'
    }],
    administrateurs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'utilisateurs'
    }]
}, {
    collection: 'groupes',
    minimize: false,
    versionKey: false
});

module.exports = Schema;