import express from 'express';

const a = require('../controllers/appController')

const router = express.Router();
  
  router.get('/all', a.getAllRestaurants);
  
  router.get('/all/:restaurant_id', a.getRestaurantById);
  
  router.put('/all/:restaurant_id', a.updateRestaurant);

  router.delete('/all/:restaurant_id', a.deleteRestaurant)
  
  export default router;
