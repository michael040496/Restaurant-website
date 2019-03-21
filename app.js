import router from './router/routes.js';

const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const uuid = require('uuid/v4')

const bodyParser = require('body-parser')
var app = express();
var path = require('path');
const maketables = require('./maketables.js');
const insertinto = require('./insertinto.js');


const pool = require('./db.js');
app.use(express.static('resources'));

app.use(router);
app.use(session({ secret: 'US government killed JFK'}))

/*app.get('/', (req, res) => {
	req.session.name = 'my-web-app'
	console.log('Session inf:')
	console.log(req.sessionID)
	console.log(req.session)
	res.send('Your session ID is: ' + req.sessionID)
})*/

function populate(){
   
    insertinto.insertRestaurant("Michaels Fruits and Brewings", "Ethiopia", "Diner", "Schmaker godt", 1, 3 )
    insertinto.insertRestaurant("Philippes Guns", "Spania", "Drinks", "Smeller bra", 1, 1 )
    insertinto.insertRestaurant("Barteks Moussli", "Polen", "Diner", "Alt mousserende", 1, 2 )
    
    insertinto.insertReview("4.6", "yaya not baaad", 1, 1, 1)
    insertinto.insertReview("1.1", "too moussy", 1, 1, 3)
    insertinto.insertReview("3.6", "very veggy", 1, 2, 2)
    
    insertinto.insertUser("Michaelooo", "veggie4lyfe@mail", "melon", 1, 1 )
    insertinto.insertUser("Philippeloo", "gunsandtattooes@mail", "ak47", 1, 1 )
    insertinto.insertUser("Bartekeloo", "1337@mail", "leet", 1, 1 )
}

function createAllTables(){
    maketables.createTableRestaurant();
    maketables.createTableReview();
    maketables.createTableUsers();
    maketables.alterTableRestaurant();
    maketables.alterTableReview();
}

app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname + '/index.html'))
});

app.get('/restaurant', async(req, res) => {
    let data = await getData("restaurant");
    res.json(data);
});

app.get('/user', async(req, res) => {
    let data = await getData("users");
    res.json(data);
});

app.get('/avg', async(req, res) => {
    let data = await findAvg("restaurant");
    res.json(data);
});

app.get('/review', async(req, res) => {
    let data = await getData("review");
    res.json(data);
});



app.get('/user/:id', async(req, res) => {
    
    let id = parseInt(req.params.id);
    let data = await getDataID("users", "user_id", id);
    res.json(data);
});

app.get('/review/:id', async(req, res) => {
    
    let id = parseInt(req.params.id);
    let data = await getDataID("review", "review_id", id);
    res.json(data);
});

app.get('/restaurant/:id', async(req, res) => {
    
    let id = parseInt(req.params.id);
    let data = await getDataID("restaurant", "restaurant_id", id);
    res.json(data);
});





    
async function getDataID(table,table_id,id) {
    let data;
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM ' + table + ' WHERE ' + table_id + '= ' + id);
      data = { 'results': (result) ? result.rows : null }['results'];
      client.release();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
}
 


async function getData(table) {
    let data;
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM ' + table);
      data = { 'results': (result) ? result.rows : null }['results'];
      client.release();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
}

async function findAvg(table){
    let data;
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT review.restaurant_id, AVG(review.rating) AS avgRating FROM ' + table + ' INNER JOIN review ON restaurant.restaurant_id = review.restaurant_id GROUP BY review.restaurant_id ORDER BY avgRating DESC, review.restaurant_id LIMIT 5');
      data = { 'results': (result) ? result.rows : null}['results'];
      client.release();
      console.log(data);
      return data;
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
    
}


app.use("/static",
        express.static('resources'));

app.listen(process.env.PORT || 8080)

