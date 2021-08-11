const mongoose = require('mongoose');
const config = require('../config/db.config');

const ChatSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },

    recipient: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    conversationId: {
        type: String,
        required: true
    }



}, {timestamps: true});


module.exports = mongoose.model('Chat', ChatSchema);
