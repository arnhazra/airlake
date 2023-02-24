const mongoose = require('mongoose')

const DataSetSchema = new mongoose.Schema({
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

module.exports = DataSetModel = mongoose.model('dataset', DataSetSchema)