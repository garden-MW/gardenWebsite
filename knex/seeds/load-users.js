/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require("fs");

exports.seed = function (knex) {
  const contents = fs.readFileSync("./data/seed.json");
  const data = JSON.parse(contents);

  const serializedData = data.map((user) => ({
    ...user,
    classes: JSON.stringify(user.classes),
    partners: JSON.stringify(user.partners),
    "profile-pic": JSON.stringify(user["profile-pic"]),
  }));

  // Deletes ALL existing entries
  // Use batch insert because we could have too many users for simple insert
  return knex("User")
    .del()
    .then(() => knex.batchInsert("User", serializedData, 100));
};
