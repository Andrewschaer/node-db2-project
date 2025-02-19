const express = require('express');
const Cars = require('./cars-model');
const { checkCarId,
        checkCarPayload, 
        checkVinNumberValid, 
        checkVinNumberUnique } = require('./cars-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const all = await Cars.getAll();
        res.json(all);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', checkCarId, async (req, res, next) => {
    try {
        const car = await Cars.getById(req.params.id);
        res.json(car);
    } catch (err) {
        next(err);
    }
});

router.post('/', 
            checkCarPayload, 
            checkVinNumberUnique, 
            checkVinNumberValid, 
            async (req, res, next) => {
    try {
        const newCar = await Cars.create(req.body);
        res.status(201).json(newCar);
    } catch (err) {
        next(err);
    }
});

module.exports = router;