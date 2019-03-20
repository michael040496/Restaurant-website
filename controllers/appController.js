import pool from '../models/db';

const getAllRestaurants = (request, response) => {
    pool.query('SELECT * FROM restaurant', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getRestaurantById = (request, response) => {
      const id = parseInt(request.params.restaurant_id)
    
      pool.query('SELECT * FROM restaurant WHERE restaurant_id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }
    
  const updateRestaurant = (request, response) => {
      const id = parseInt(request.params.restaurant_id)
      const { name, address, category, description } = request.body
    
      pool.query(
        'UPDATE restaurant SET name = $1, address = $2, category = $3, description = $4 WHERE restaurant_id = ' + id ,
        [name, address, category, description],
        (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).send(`Restaurant with ID ${id}  got modified:`)
        }
      )
    }

    const deleteRestaurant = (request, response) => {
        const id = parseInt(request.params.id)
      
        pool.query('DELETE FROM restaurant WHERE restaurant_id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).send(`Restaurant with  ID: ${id} deleted`)
        })
      }

    module.exports = {
        getAllRestaurants,
        getRestaurantById,
        updateRestaurant,
        deleteRestaurant
      }

   
