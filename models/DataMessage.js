/* eslint-disable camelcase */
// import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class DataMessage extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "DataMessage";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        type: { type: "string" },
        message: { type: "string"},
      },
    };
  }
}