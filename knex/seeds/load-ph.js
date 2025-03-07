/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require("fs");

exports.seed = function (knex) {
  const contents = fs.readFileSync("./data/ph.json");
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  // Use batch insert because we could have too many users for simple insert
  return knex("PH")
    .update({ seq: 0})
    .del()
    .then(() => knex.batchInsert("PH", data, 100));
};
