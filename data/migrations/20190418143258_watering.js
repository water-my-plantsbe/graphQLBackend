exports.up = function(knex, Promise) {
    return knex.schema.createTable('watering', tbl => {
      tbl.increments('id');
      tbl.integer('plant_id').references('id').inTable('plants').onDelete('CASCADE');
      tbl.datetime('watering_time');
    });
  };
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('watering');
};
  