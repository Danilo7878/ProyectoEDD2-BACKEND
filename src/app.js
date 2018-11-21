const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const indexRoutes = require('./routes/index.js');

//settings
app.set('port', process.env.PORT || 3000);
mongoose.connect('mongodb://danilo7878:Alex7878@chat-shard-00-00-tili7.mongodb.net:27017,chat-shard-00-01-tili7.mongodb.net:27017,chat-shard-00-02-tili7.mongodb.net:27017/test?ssl=true&replicaSet=Chat-shard-0&authSource=admin&retryWrites=true',
{useNewUrlParser:true}
);

//middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () =>{
    console.log('server on port ', app.get('port'));
});