const { Schema } = require("mongoose");
const db = require("../db/db");

const Carro = db.model(
  "Carro",
  new Schema({
    veiculo: {
      type: String,
      required: true,
    },
    marca: {
      type: String,
      required: true,
    },
    ano: {
      type: Number,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    vendido: {
      type: Boolean,
      required: true,
    },
    created: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    updated: {
      type: Date,
      default: () => Date.now(),
      immutable: false
    },
  })
);

module.exports = Carro
