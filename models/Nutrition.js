/* eslint-disable camelcase */
// import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class PH extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Nutrition";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        date: { type: "string" },
        sensor: { type: "string" },
        value: { type: "float"},
      },
    };
  }
}