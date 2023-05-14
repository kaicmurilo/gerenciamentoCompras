const mongoose = require("mongoose");
const moment = require('moment');

const compraSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  valor: { type: Number, required: true },
  data: {
    type: Date,
    required: true,
    default: moment().format("YYYY/MM/DD"),
  },
});

module.exports = mongoose.model("Compra", compraSchema);
