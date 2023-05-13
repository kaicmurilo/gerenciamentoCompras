const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  valor: { type: Number, required: true },
  data: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Compra", compraSchema);
