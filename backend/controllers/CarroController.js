const {
  existsOrError,
  validString,
  validId,
} = require("../helpers/validations");

const Carro = require("../models/carro");

const addNewCar = async (req, res) => {
  const { veiculo, marca, ano, descricao, vendido } = req.body;

  try {
    existsOrError(veiculo, "O veiculo é necessario!");
    existsOrError(marca, "A marca é necessaria!");
    existsOrError(ano, "O ano é necessario!");
    existsOrError(descricao, "A descrição é necessaria!");
    validString(marca, "O nome do veiculo é invalido");

    if (ano <= 1900) throw "O ano de veiculo é invalido";

    const carro = new Carro({
      veiculo: veiculo,
      marca: marca,
      ano: ano,
      descricao: descricao,
      vendido: vendido,
    });

    await carro.save();

    res.status(200).send("O carro foi cadastrado  com sucesso!");
  } catch (err) {
    res.status(401).send(err);
  }
};

const getCars = async (req, res) => {
  try {
    const carros = await Carro.find({});
    if (!carros || carros.length === 0) throw "Nenhum carro encontrado!";

    res.status(200).send(carros);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateCar = async (req, res) => {
  const { veiculo, marca, ano, descricao, vendido } = req.body;
  const id = req.params.id;

  try {
    validId(id);
    const carro = await Carro.findOne({ _id: id });
    if (!carro) throw "Nenhum carro encontrado!";
    validString(marca, "O nome da marca é invalido!");

    if (ano <= 1900) throw "O ano de veiculo é invalido";

    carro.marca = marca;
    carro.ano = ano;
    carro.veiculo = veiculo;
    carro.descricao = descricao;
    carro.vendido = vendido;

    await Carro.findByIdAndUpdate(
      { _id: carro._id },
      { $set: carro },
      { new: true }
    );

    res.status(200).send("O veiculo foi atualizado com sucesso!");
  } catch (err) {
    res.status(400).send(err);
  }
};

const getCarById = async (req, res) => {
  const id = req.params.id;

  try {
    validId(id);
    const carro = await Carro.find({ _id: id });

    if (!carro || carro.length === 0) throw "Nenhum carro encontrado!";

    res.status(200).send(carro);
  } catch (err) {
    res.status(400).send(err);
  }
};

const searchCar = async (req, res) => {
  const car = req.body.veiculo;

  try {
    existsOrError(car, "Digite o nome do carro!");

    const carro = await Carro.find({ veiculo: { $regex: ".*" + car + ".*" } });
    if (!carro || carro.length === 0) throw "Nenhum carro encontrado!";

    res.status(200).send(carro);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateCarWithPatch = async (req, res) => {
  const { veiculo, marca, ano, descricao, vendido } = req.body;
  const id = req.params.id;

  try {
    validId(id);
    const carro = await Carro.findOne({ _id: id });
    if (!carro || carro.length === 0) throw "Nenhum carro encontrado!";

    if (veiculo) carro.veiculo = veiculo;
    if (marca) carro.marca = marca;
    if (ano) carro.ano = ano;
    if (descricao) carro.descricao = descricao;
    if (vendido) carro.vendido = vendido;

    await Carro.findByIdAndUpdate(
      { _id: carro._id },
      { $set: carro },
      { new: true }
    );

    res.status(200).send("O carro foi atualizado com sucesso!");
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteCar = async (req, res) => {
  const id = req.params.id;
  try {
    validId(id);
    const carro = await Carro.findById({ _id: id });
    if (carro.length === 0 || !carro) throw "Nenhum carro encontrado!";

    await Carro.findByIdAndDelete({ _id: carro._id });

    res.status(400).send("O carro foi deletado com sucesso!");
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  addNewCar,
  getCars,
  updateCar,
  getCarById,
  updateCarWithPatch,
  deleteCar,
  searchCar,
};
