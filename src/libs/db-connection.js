const mongoose = require('mongoose');

let db;

module.exports = function Connection(){
if(!db){
db = mongoose.connect('mongodb://danilo7878:Alex7878@chat-shard-00-00-tili7.mongodb.net:27017,chat-shard-00-01-tili7.mongodb.net:27017,chat-shard-00-02-tili7.mongodb.net:27017/test?ssl=true&replicaSet=Chat-shard-0&authSource=admin&retryWrites=true',{useNewUrlParser:true});
}
return db;
}