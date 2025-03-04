/* eslint-disable camelcase */
// import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class User extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "User";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],

      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        email: { type: "string" },
        pronouns: { type: "string", default: "Not specified" },
        major: { type: "string", default: "Undeclared" },
        "grad-year": { type: "string", default: "" },
        "profile-pic": { type: "array", default: [] },
        bio: { type: "string", default: "" },
        interests: { type: "string", default: "" },
        classes: { type: "array", default: [] },
        partners: { type: "array", default: [] },
      },
    };
  }
}
