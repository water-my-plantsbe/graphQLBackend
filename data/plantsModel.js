const db = require('./dbConfig.js');

module.exports = {
  find,
  findBy,
  findPlants,
  findPlant,
  addPlant,
  findById,
  deletePlantById,
  updatePlant,
  addWatering,
  deleteWateringTime,
  deleteWateringbyId,
  getWateringSchedule
};

function find() {
  return db('plants').select('id','name', 'description');
}
function findPlants() {
  return db('plantbook').select('id','plant_name');
}
function findBy(filter) {
  return db('plants').where(filter);
}
function findPlant(user_id) {
  return db('plants').where({user_id});
}

async function addPlant(user_id, plantinfo ){
  const [id] = await db('plants').insert({user_id, name: plantinfo.name, description: plantinfo.description,})
  .returning("id");
  return findById(id);
}


function findById(id) {
  return db('plants').select('id', 'name', 'description', 'user_id')
    .where({ id })
    .first();
}


function deletePlantById(id) {
  return db('plants')
    .where({ id })
    .delete();
}

function updatePlant(id, user) {
  return db('plants')
    .where('id', Number(id))
    .update(user);
}

async function addWatering(plant_id, watering){
  const [id] = await db('plants').insert({plant_id, watering_time: watering.watering_time})
  .returning("id");
  return findById(id);
}

function getWateringSchedule(plant_id) {
  return db('watering')
  .where({ plant_id })
  .select('id', 'watering_time')
}
function deleteWateringbyId(plant_id) {
  return db('watering')
    .where({ plant_id })
    .delete();
}
function deleteWateringTime(id) {
  return db('watering')
    .where({ id })
    .delete();
}

exports.notifications = {
  // when we add watering, we get time, plant name, user name, user phone for notification
  addNotification: wateringId =>
    db('watering as w')
      .join('plants as p', 'w.plant_id', 'p.id')
      .join('users as u', 'p.user_id', 'u.id')
      .where({ 'w.id': wateringId })
      .select('u.username', 'p.name as plant', 'u.phone', 'w.watering_time')
};