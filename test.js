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

const compra = {
  tipo: "credito",
  valor: 50.0,
};

describe("POST /compras/novaCompra", () => {
  test("Deve criar uma nova compra", async () => {
    const response = await request(app)
      .post("/compras/novaCompra")
      .send(compra);

    expect(response.statusCode).toBe(201);
    expect(response.body.tipo).toBe("credito");
    expect(response.body.valor).toBe(50.0);
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

describe("GET /compras/relatorio", () => {
  test("Deve retornar o relatório de compras do dia especificado", async () => {
    // cria uma compra para a data especificada

    // faz a requisição GET para o relatório de compras da data especificada
    const response = await request(app)
      .get("/compras/relatorio")
      .send({ data: "2023-05-14" });

    // verifica se o status da resposta é 200 e se o corpo é um array com a compra criada
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].tipo).toBe(compra.tipo);
    expect(response.body[0].valor).toBe(compra.valor);
  });
});
