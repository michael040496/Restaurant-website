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



//createTableRestaurant();
async function createTableRestaurant() {
        try {
        const client = await pool.connect()
        
        const result = await client.query('CREATE TABLE restaurant(restaurant_id SERIAL PRIMARY KEY, name VARCHAR(128) NOT NULL, address TEXT, category VARCHAR(255), description TEXT, created_at TIMESTAMP, updated_at TIMESTAMP, active SMALLINT, user_id INT, FOREIGN KEY (user_id) REFERENCES users (user_id), FOREIGN KEY (restaurant_id) REFERENCES review (review_id))');
        //data = { 'results': (result) ? result.rows : null }['results'];
        client.release();
    } catch (err) {
        console.error(err);
    }
}


//createTableUsers();
async function createTableUsers() {
        try {
        const client = await pool.connect()
        
        const result = await client.query("CREATE TABLE IF NOT EXISTS users ( user_id SERIAL PRIMARY KEY, username VARCHAR(128) NOT NULL, email VARCHAR(128), password VARCHAR(20), role SMALLINT, created_at TIMESTAMP, updated_at TIMESTAMP, active SMALLINT )");
        //data = { 'results': (result) ? result.rows : null }['results'];
        client.release();
    } catch (err) {
        console.error(err);
    }
}

//createTableReview();
async function createTableReview() {
        try {
        const client = await pool.connect()
        
        const result = await client.query("CREATE TABLE IF NOT EXISTS review ( review_id SERIAL PRIMARY KEY, rating DECIMAL(2) NOT NULL, reviewText TEXT,  created_at TIMESTAMP, updated_at TIMESTAMP, active SMALLINT, user_id INT REFERENCES users(user_id) ON DELETE CASCADE, restaurant_id INT REFERENCES restaurant(restaurant_id) ON DELETE CASCADE)");
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


//insertReview(4.2, "verii good, very najs", "1999-01-08 04:05:06","1999-01-08 04:05:06", 1, 1, 2)

async function insertReview(rating, reviewText, created_at, updated_at, active, user_id, restaurant_id) {
    try {
        const client = await pool.connect()
        const result = await client.query('INSERT INTO review (rating, reviewText, created_at, updated_at, active, user_id, restaurant_id)  VALUES($1,$2,$3,$4,$5,$6,$7)', [rating, reviewText, created_at, updated_at, active, user_id, restaurant_id]);
        console.log("Inserting review, successfully.");
        client.release();
    } catch (err) {
        console.log("Inserting review, failed.");
        console.error(err);
    }
}

//insertUser("Username", "leeeet1337@mail", "bestpassord", 1, "1999-01-08 04:05:06", "1999-01-08 04:05:06", 1 )

async function insertUser(username,email,password, role, created_at, updated_at, active) {
    try {
        const client = await pool.connect()
        const result = await client.query('INSERT INTO users (username,email,password, role, created_at, updated_at, active)  VALUES($1,$2,$3,$4,$5,$6,$7)', [username,email,password, role, created_at, updated_at, active]);
        console.log("Inserting user, successfully.");
        client.release();
    } catch (err) {
        console.log("Inserting user, failed.");
        console.error(err);
    }
}


app.get('/data', (req, res) => {
 res.json(pets)
});



app.use("/static",
        express.static('resources'));

app.listen(process.env.PORT || 8080)