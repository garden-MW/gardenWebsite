//This file (as in name) was created by typing "npx knex migrate:make blankData1" in the terminal

/* eslint-disable func-names */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("BlankData2", (table) => {
      table.increments("id").primary();
      table.string("date").notNullable();
      table.string("sensor").notNullable();
      table.decimal("value").notNullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("BlankData2");
  };