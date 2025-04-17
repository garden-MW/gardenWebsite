/* eslint-disable camelcase */
// import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class PH extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "PH";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["sensor_type", "date", "value"],
      additionalProperties: false,

      properties: {
        id: { type: "integer" },
        date: { type: "string" },
        sensor_type: { type: "string", enum: ["Ph"] },
        value: { type: "number"},
      },
    };
  }
}
