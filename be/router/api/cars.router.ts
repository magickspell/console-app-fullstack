import express from 'express';
import {getList, postCar, updateCar} from '../../services/services.index'

const CarsModel = require('../../models/cars.model');
const router = express.Router();

// I've built REST API in case that each operation has its own route.
// but it can be split with query method because we have just one entity - cars list.
// anyway, I think, that one endpoint for each operation is better in that case.

router.get('/api/cars/list', async function (req, res) {
    await getList(req, res);
});

router.post('/api/cars/create', async function (req, res) {
    await postCar(req, res);
});

router.put('/api/cars/update', async function (req, res) {
    await updateCar(req, res);
});

// this is example how we can get rid of services.
router.delete('/api/cars/delete', function (req, res) {
    try {
        CarsModel.deleteOne({id: req.body.id}).lean().then((response: any) => {
            res.status(200).json(response)
        });
    } catch (e: any) {
        res.status(500).json(`critical server error: ${e.message}`);
    }
});

export default router;