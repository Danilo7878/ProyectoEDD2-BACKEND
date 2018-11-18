module.exports = function(){
    var db = require('../libs/db-connection')();
    var Schema = require('mongoose').Schema;

    var User = Schema({
        username: String,
        password: String,
        nombre: String,
        apellido: String,
        puesto: String,
        correo: String
    })
}