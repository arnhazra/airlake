const mongoose = require('mongoose')

const DatasetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    data: {
        type: Object,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
}, { versionKey: false })

module.exports = DatasetModel = mongoose.model('dataset', DatasetSchema)