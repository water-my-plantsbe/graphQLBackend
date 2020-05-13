exports.up = function (knex, Promise) {
  return knex.schema.createTable("plants", (tbl) => {
    tbl.increments("id");
    tbl.integer("user_id").notNullable().references("id").inTable("users");
    tbl.string("name").notNullable();
    tbl.string("url");
    tbl.text("description");
    tbl.integer("water_per_week");
    tbl.string("sunlight");
    tbl.string("temperature");
    tbl.string("difficulty");
    tbl.string("size");
    tbl.date("last_water");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("plants");
};
