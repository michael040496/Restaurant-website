const express = require('express');
//const pg = require('pg')
var app = express();
var path = require('path');
const maketables = require('./maketables.js');
const insertinto = require('./insertinto.js');
//var pets = require('./pet.json');
app.use(express.static('resources'));

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgres://aanougfckieono:d9ce13b420528808525a59abd103d40908d26f195910a09712e14d748ddb7f28@ec2-54-247-85-251.eu-west-1.compute.amazonaws.com:5432/d78t1br827i6e',
    ssl: true
});

/*pool.query("SELECT NOW()", (err, res) => {
console.log(err, res);
pool.end();
});
*/


//populate();
function populate(){
    //insertRestaurant("Tacoloco", "oslo", "taco", "godt", timestamp, timestamp, 1, 1 )
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






//var noww = new Date();

//noww = now.format("dd-MM-yyyy hh:mm:ss TT");
//createAllTables();


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

app.get('/review', async(req, res) => {
    let data = await getData("review");
    res.json(data);
});

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


app.get('/data', (req, res) => {
 res.json(pets)
});



app.use("/static",
        express.static('resources'));

app.listen(process.env.PORT || 8080)


module.exports = {
    pool
}