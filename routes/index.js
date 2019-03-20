import express from "express"

const a = require("../controllers/appController")
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.json())
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// RESTAURANT: GET, POST, PUT
router.get("/restaurant", a.getAllRestaurants)
router.get("/restaurant/:restaurant_id", a.getRestaurantById)
router.post("/restaurant", a.postRestaurant)
router.put("/restaurant/:restaurant_id", a.updateRestaurant)

// USER: GET, POST, PUT
router.get("/user", a.getAllUsers)
router.get("/user/:id", a.getUserById)
router.post("/user", a.postUser)
router.put("/user/:id", a.updateUser)

// REVIEW: GET, POST, PUT
router.get("/review", a.getAllReviews)
router.get("/review/:id", a.getReviewById)
router.post("/review", a.postReview)
router.put("/review/:id", a.updateReview)

export default router
