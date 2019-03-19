
import bodyParser from 'body-parser';
import router from './routes/index.js';



var express = require('express'),
app = express(),
port = process.env.PORT || 3000;
app.listen(port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

console.log('todo list RESTful API server started on: ' + port);

//get all todolists

