exports.up = function(knex, Promise) {
    return knex.schema.createTable('plantbook', tbl => {
      tbl.increments('id');
      tbl.string('plant_name')
    });
  };
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('plantbook');
};
  