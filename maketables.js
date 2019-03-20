const app = require('./app.js');
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgres://aanougfckieono:d9ce13b420528808525a59abd103d40908d26f195910a09712e14d748ddb7f28@ec2-54-247-85-251.eu-west-1.compute.amazonaws.com:5432/d78t1br827i6e',
    ssl: true
});
//createTableRestaurant();
async function createTableRestaurant() {
        try {
        const client = await pool.connect()
        
        const result = await client.query('CREATE TABLE restaurant(restaurant_id BIGSERIAL PRIMARY KEY, name VARCHAR(128) NOT NULL, address TEXT, category VARCHAR(255), description TEXT, created_at TIMESTAMP, updated_at TIMESTAMP, active SMALLINT, user_id BIGINT)');
        //data = { 'results': (result) ? result.rows : null }['results'];
        client.release();
    } catch (err) {
        console.error(err);
    }
}


//alterTableRestaurant();
async function alterTableRestaurant() {
        try {
        const client = await pool.connect()
        
        const result = await client.query('ALTER TABLE restaurant ADD FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE, ADD FOREIGN KEY (restaurant_id) REFERENCES review (review_id) ON DELETE CASCADE');
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
        
        const result = await client.query("CREATE TABLE IF NOT EXISTS users ( user_id BIGSERIAL PRIMARY KEY, username VARCHAR(128) NOT NULL, email VARCHAR(128), password VARCHAR(20), role SMALLINT, created_at TIMESTAMP, updated_at TIMESTAMP, active SMALLINT )");
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
        
        const result = await client.query("CREATE TABLE IF NOT EXISTS review ( review_id BIGSERIAL PRIMARY KEY, rating DECIMAL(2,1), reviewText TEXT,  created_at TIMESTAMP, updated_at TIMESTAMP, active SMALLINT, user_id BIGINT, restaurant_id BIGINT)");
        //data = { 'results': (result) ? result.rows : null }['results'];
        client.release();
    } catch (err) {
        console.error(err);
    }
}


//alterTableRestaurant();
async function alterTableReview() {
        try {
        const client = await pool.connect()
        
        const result = await client.query("ALTER TABLE IF EXISTS review ADD FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE, ADD FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id) ON DELETE CASCADE");
        //data = { 'results': (result) ? result.rows : null }['results'];
        client.release();
    } catch (err) {
        console.error(err);
    }
}


module.exports = {
    createTableRestaurant,
    createTableReview,
    createTableUsers,
    alterTableRestaurant,
    alterTableReview
}
