const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

exports.checkCarId = (req, res, next) => {
  const { id } = req.params;
  Cars.getById(id)
    .then(possibleCar => {
      if (possibleCar) {
        req.Car = possibleCar;
        next();
      } else {
        next({ message: `car with id ${id} is not found`, 
              status: 404 });
      }
    })
    .catch(next);
}

exports.checkCarPayload = (req, res, next) => {
  if (req.body.vin === undefined) {
    next({ 
      message: 'Vin is missing',
      status: 400 });
  } else if (req.body.make === undefined) {
    next({ 
      message: 'Make is missing',
      status: 400 });
  } else if (req.body.model === undefined) {
    next({ 
      message: 'Model is missing',
      status: 400 });
  } else if (req.body.mileage === undefined) {
    next({ 
      message: 'Mileage is missing',
      status: 400 });
  } else {
    next();
  }
};

exports.checkVinNumberValid = (req, res, next) => {
  if (vinValidator(req.body.vin)) {
    next({
      message: `vin ${req.body.vin} is invalid`,
      status: 400 });
  } else {
    next();
  }
};

exports.checkVinNumberUnique = (req, res, next) => {
  const { vin } = req.body;
  Cars.getByVin(vin)
    .then(possibleDuplicate => {
      if (possibleDuplicate) {
        next({
          message: `vin ${vin} already exists`,
          status: 400 });
      } else {
        next();
      }
    })
    .catch(next);
};
