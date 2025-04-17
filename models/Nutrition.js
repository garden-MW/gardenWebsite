/* eslint-disable camelcase */
// import { Model } from "objection";
import { format } from "mysql";
import BaseModel from "./BaseModel";

export default class Nutrition extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Nutrition";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["sensor_type", "date", "value"],
      additionalProperties: false,

      properties: {
        id: { type: "integer" },
        date: { type: "string", format: "date-time" },
        sensor_type: { type: "string", enum: ["Nutrition"] },
        value: { type: "number"},
      },
    };
  }
}