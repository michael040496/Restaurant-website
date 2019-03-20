import router from './routes/index.js';

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
var path = require('path');
//const db = require('./models/db.js/')
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
 });

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})