const Compra = require("../models/compra");
const moment = require("moment");
exports.criarCompra = async (req, res) => {
  const { tipo, valor, data } = req.body;

  // Verifica se o tipo é válido
  const isValidType = tipo === "credito" || tipo === "debito";

  try {
    if (!isValidType) {
      throw new Error("Tipo de compra inválido.");
    }

    const compra = await Compra.create({ tipo, valor, data });
    res.status(201).json(compra);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar compra." });
  }
};

exports.getCompras = async (req, res) => {
  try {
    const compras = await Compra.find();
    return res.status(200).json(compras);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

exports.getRelatorio = async (req, res) => {
  const { data } = req.body;
  const start = moment(data).startOf("day");
  const end = moment(data).endOf("day");

  try {
    const compras = await Compra.find({ data: { $gte: start, $lte: end } });
    const saldoConsolidado = compras.reduce(
      (total, compra) => total + compra.valor,
      0
    );

    return res.status(200).json({ compras, saldoConsolidado });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};
