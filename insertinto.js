const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgres://aanougfckieono:d9ce13b420528808525a59abd103d40908d26f195910a09712e14d748ddb7f28@ec2-54-247-85-251.eu-west-1.compute.amazonaws.com:5432/d78t1br827i6e',
    ssl: true
});

var timestamp = new Date();
var date = timestamp.getDate();
var month = timestamp.getMonth(); 
var year = timestamp.getFullYear();
//insertRestaurant("Tacoloco", "oslo", "taco", "godt", timestamp, timestamp, 1, 1 )

async function insertRestaurant(name,address,category,description, active, userID) {
    try {
        const client = await pool.connect()
        const result = await client.query('INSERT INTO restaurant (name,address,category,description, created_at, updated_at, active, user_id)  VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [name,address,category,description, timestamp, timestamp, active, userID]);
        console.log("Inserting restaurant, successfully.");
        client.release();
    } catch (err) {
        console.log("Inserting restaurant, failed.");
        console.error(err);
    }
}


//insertReview("4.6", "yaya not baaad", 1, 1, 2)

async function insertReview(rating, reviewText, active, user_id, restaurant_id) {
    try {
        const client = await pool.connect()
        const result = await client.query('INSERT INTO review (rating, reviewText, created_at, updated_at, active, user_id, restaurant_id)  VALUES($1,$2,$3,$4,$5,$6,$7)', [rating, reviewText, timestamp, timestamp, active, user_id, restaurant_id]);
        console.log("Inserting review, successfully.");
        client.release();
    } catch (err) {
        console.log("Inserting review, failed.");
        console.error(err);
    }
}

//insertUser("Username", "leeeet1337@mail", "bestpassord", 1, 1 )

async function insertUser(username,email,password, role, active) {
    try {
        const client = await pool.connect()
        const result = await client.query('INSERT INTO users (username,email,password, role, created_at, updated_at, active)  VALUES($1,$2,$3,$4,$5,$6,$7)', [username,email,password, role, timestamp, timestamp, active]);
        console.log("Inserting user, successfully.");
        client.release();
    } catch (err) {
        console.log("Inserting user, failed.");
        console.error(err);
    }
}


module.exports = {
    insertRestaurant,
    insertReview,
    insertUser
}