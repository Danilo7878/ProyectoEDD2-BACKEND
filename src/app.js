const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');


const app = express();
const indexRoutes = require('./routes/index.js');

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));

//routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () =>{
    console.log('server on port ', app.get('port'));
});