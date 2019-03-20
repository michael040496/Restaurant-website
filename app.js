import router from './routes/index.js';

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
//const db = require('./models/db.js/')
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})