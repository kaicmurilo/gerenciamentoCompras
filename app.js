const express = require("express");
const app = express();
const compraRoutes = require("./routes/compraRoutes");
const database = require("./config/database");

app.use(express.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Este é o serviço de compras.");
});

app.use("/compras", compraRoutes);

database.connect();

app.listen(3000, () => console.log("Servidor rodando na porta 3000."));

module.exports = () => app;
