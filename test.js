const request = require("supertest");
const createApp = require("./app");
const mongoose = require("mongoose");
const Compra = require("./models/compra");

let app;

beforeAll(async () => {
  app = createApp();
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await Compra.deleteMany();
  await mongoose.disconnect();
});

describe("POST /compras/novaCompra", () => {
  test("Deve criar uma nova compra", async () => {
    const compra = {
      tipo: "credito",
      valor: 50.0,
      data: new Date(),
    };

    const response = await request(app)
      .post("/compras/novaCompra")
      .send(compra);

    expect(response.statusCode).toBe(201);
    expect(response.body.tipo).toBe("credito");
    expect(response.body.valor).toBe(50.0);
    expect(response.body.data).toBe(compra.data.toISOString());
  });

  test("Deve retornar erro 500 se não enviar todos os campos obrigatórios", async () => {
    const compra = {
      tipo: null,
      valor: 50.0,
    };

    const response = await request(app)
      .post("/compras/novaCompra")
      .send(compra);

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("Erro ao criar compra.");
  });

  test("Deve retornar erro 500 se enviar um tipo inválido", async () => {
    const compra = {
      tipo: "débito",
      valor: 50.0,
      data: new Date(),
    };

    const response = await request(app)
      .post("/compras/novaCompra")
      .send(compra);

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("Erro ao criar compra.");
  });
});
