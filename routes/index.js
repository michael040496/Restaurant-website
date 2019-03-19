require('dotenv').config();
import express from 'express';
import db from '../db/db';
import appController from '../controller/appController';

const router = express.Router();

router.get('/all', appController.getAll);

router.post('/all', appController.createOne);

router.get('/all/:id', appController.getOne);

router.put('/all/:id', appController.updateOne);

/*app.get('/all/:title', (req, res) =>{
    const title = JSON.stringify(req.params.title);

     db.map((todo) => {
         if(todo.id === id){
             return res.status(200).send({
                 success: 'true',

                 message: 'Success!',

                 todo
             });

         }

     });
     return res.status(404).send({
        success: 'false',
        message: 'does not exist'

     });

});*/
export default router;