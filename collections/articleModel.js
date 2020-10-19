const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        max: 50,
        trim: true,
        required: true,
        min: 5
    },
    subTitle: {
        type: String,
        max: 50,
        trim: true,
        required: true,
        min: 5
    },
    tags: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    updatedDate: {
        type: Date,
    },
    createdBy: {
        type: String,
        required: true
    }
});
const articleModel = mongoose.model('articleCollection', articleSchema);
module.exports = articleModel;