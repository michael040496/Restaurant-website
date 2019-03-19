const express = require('express');
//const pg = require('pg')
var app = express();
var path = require('path');
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

//createRestaurant();
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname + '/index.html'))
});

app.get('/restaurant', async(req, res) => {
    let data = await getRestaurant();
    console.log(data);
    res.json(data);
    });


async function getRestaurant() {
    let data;
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM restaurant');
      data = { 'results': (result) ? result.rows : null }['results'];
      client.release();
      console.log(data);
      return data;
    } catch (err) {
      //console.log(data);
      console.error(err);
      res.send("Error " + err);
    }
}




async function createRestaurant() {
        try {
        const client = await pool.connect()
        
        const result = await client.query('CREATE TABLE restaurant(id SERIAL PRIMARY KEY, name VARCHAR(128) NOT NULL, address TEXT, category VARCHAR(255), description TEXT, created_at TIMESTAMP, updated_at TIMESTAMP, active SMALLINT, user_id INT)');
        //data = { 'results': (result) ? result.rows : null }['results'];
        client.release();
    } catch (err) {
        console.error(err);
    }
}

//insertRestaurant("Tacoloco", "oslo", "taco", "godt", "1999-01-08 04:05:06", "1999-01-08 04:05:06", 1, 1 )

async function insertRestaurant(name,address,category,description, createdAt, updatedAt, active, userID) {
    try {
        const client = await pool.connect()
        const result = await client.query('INSERT INTO restaurant (name,address,category,description, created_at, updated_at, active, user_id)  VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [name,address,category,description, createdAt, updatedAt, active, userID]);
        console.log("Inserting restaurant, successfully.");
        client.release();
    } catch (err) {
        console.log("Inserting restaurant, failed.");
        console.error(err);
    }
}


app.get('/data', (req, res) => {
 res.json(pets)
});



app.use("/static",
        express.static('resources'));

app.listen(process.env.PORT || 8080)