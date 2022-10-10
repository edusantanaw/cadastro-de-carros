const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/carro")
  .then(() => {
    console.log("conectado com sucesso ao banco de dados!");
  })
  .catch((err) => {
    console.log(err);
  });

  module.exports = mongoose
