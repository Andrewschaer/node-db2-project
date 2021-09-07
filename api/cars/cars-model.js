const db = require('../../data/db-config');

const getAll = () => {
  // select * from cars;
  return db('cars');
};

const getById = (id) => {
  // select * from cars where id = 7;
  return db('cars').where('id', id).first();
};

const getByVin = (vin) => {
  // select * from cars where vin = 11111111111111111;
  return db('cars').where('vin', vin).first();
};

async function create (newCar) {
  // insert into cars (vin, make, model, mileage)
  // values ('11111111111111111', 'Ford', 'Bronco', 100000);
  const [id] = await db('cars').insert(newCar);
  return getById(id);
}

module.exports = { getAll, getById, getByVin, create };
