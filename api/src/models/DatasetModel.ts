import mongoose from 'mongoose'

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

    rating: {
        type: Number,
        required: true
    }
}, { versionKey: false })

const DatasetModel = mongoose.model('dataset', DatasetSchema)

export default DatasetModel