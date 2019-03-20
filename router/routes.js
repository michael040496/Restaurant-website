const express = require('express');
const bodyParser = require('body-parser')
const a = require("../controllers/controller")
const router = express.Router()

router.use(bodyParser.json())
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// RESTAURANT: POST, PUT

router.post("/restaurant", a.postRestaurant)
router.put("/restaurant/:restaurant_id", a.updateRestaurant)

// USER: POST, PUT
router.post("/user", a.postUser)
router.put("/user/:id", a.updateUser)

// REVIEW: POST, PUT

router.post("/review", a.postReview)
router.put("/review/:id", a.updateReview)


export default router