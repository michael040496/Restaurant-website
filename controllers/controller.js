
const pool = require('../db.js');

var timestamp = new Date();
var date = timestamp.getDate();
var month = timestamp.getMonth(); 
var year = timestamp.getFullYear();

// RESTAURANT: UPDATE
const updateRestaurant = (request, response) => {
  const id = parseInt(request.params.id)
  const {
    name,
    address,
    category,
    description,
    updatedAt,
    active,
    user_id
  } = request.body

  pool.query(
    "UPDATE restaurant SET name = $1, address = $2, category = $3, description = $4, updated_At = $5, active = $6, user_id = $7 WHERE restaurant_id = $8",
    [
      name,
      address,
      category,
      description,
      timestamp,
      active,
      user_id,
      id
    ],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

// RESTAURANT: POST
const postRestaurant = (request, response) => {
  const {
    name,
    address,
    category,
    description,
    createdAt,
    updatedAt,
    active,
    user_id
  } = request.body

  pool.query(
    "INSERT INTO restaurant (name,address,category,description, created_at, updated_at, active, user_id)  VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
    [
      name,
      address,
      category,
      description,
      timestamp,
      timestamp,
      active,
      user_id
    ],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.restaurant_id}`)
    }
  )
}


// USER: POST
const postUser = (request, response) => {
  const {
    username,
    email,
    password,
    role,
    createdAt,
    updatedAt,
    active
  } = request.body

  pool.query(
    "INSERT INTO users (username,email,password,role,created_at, updated_at, active)  VALUES($1,$2,$3,$4,$5,$6,$7)",
    [
      username,
      email,
      password,
      role,
      timestamp,
      timestamp,
      active
    ],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.id}`)
    }
  )
}

// USER: UPDATE
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, email, password, role, updatedAt, active } = request.body

  pool.query(
    "UPDATE users SET username = $1, email = $2, password = $3, role = $4, updated_At = $5, active = $6 WHERE user_id = $7",
    [username, email, password, role, timestamp, active, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}


// REVIEW: POST
const postReview = (request, response) => {
  const {
    rating,
    reviewtext,
    created_at,
    updated_at,
    active,
    user_id,
    restaurant_id
  } = request.body

  pool.query(
    "INSERT INTO review (rating, reviewtext, created_at, updated_at, active, user_id, restaurant_id)  VALUES($1,$2,$3,$4,$5,$6,$7)",
    [
      rating,
      reviewtext,
      timestamp,
      timestamp,
      active,
      user_id,
      restaurant_id
    ],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.review_id}`)
    }
  )
}

// REVIEW: UPDATE
const updateReview = (request, response) => {
  const id = parseInt(request.params.id)
  const {
    rating,
    reviewtext,
    updated_at,
    active,
    user_id,
    restaurant_id
  } = request.body

  pool.query(
    "UPDATE review SET rating = $1, reviewtext = $2, updated_at = $3, active = $4, user_id = $5, restaurant_id = $6 WHERE review_id = $7",
    [
      rating,
      reviewtext,
      timestamp,
      active,
      user_id,
      restaurant_id,
      id
    ],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

module.exports = {
  updateRestaurant,
  postRestaurant,
  postUser,
  updateUser,
  postReview,
  updateReview
}