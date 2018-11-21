const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type : String, required:true},
    password: {type : String, required:true},
    nombre: {type : String, required:true},
    apellido: {type : String, required:true},
    puesto: {type : String, required:true},
    correo: {type : String, required:true}
});

module.exports = mongoose.model('User', UserSchema);
