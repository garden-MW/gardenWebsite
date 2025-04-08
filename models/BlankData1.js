/* eslint-disable camelcase */
// import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class BlankData1 extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "BlankData1";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        date: { type: "string" },
        sensor: { type: "string" },
        value: { type: "number"},
      },
    };
  }
}
