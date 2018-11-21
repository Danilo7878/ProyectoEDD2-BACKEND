const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    emisor: {type : String, required:true},
    receptor: {type : String, required:true},
    mensaje: {type : String, required:true},
});

module.exports = mongoose.model('Message', MessageSchema);