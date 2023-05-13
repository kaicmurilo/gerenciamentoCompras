const express = require("express");
const router = express.Router();
const compraController = require("../controllers/compraController");

router.post("/novaCompra", compraController.criarCompra);
router.get("/", compraController.getCompras);

module.exports = router;
