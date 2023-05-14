# Sistema de Gerenciamento de Compras

Este é um (BackEnd) sistema de gerenciamento de compras, onde é possível registrar e listar compras.

## Tecnologias Usadas

- Node.js
- MongoDB

## Dependências

- Express
- Mongoose
- Jest
- Dotenv
- Moment

## Instalação

Clone o repositório do GitHub:

```bash
git clone https://github.com/kaicmurilo/gerenciamentoCompras
```

Instale as dependências do projeto:

```bash
npm install
```

Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente necessárias:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/meu-banco-de-dados
```

Inicie o servidor:

```bash
npm start
```

## Teste

Instale as dependências do projeto:

```bash
npm install --save--dev jest
```

Inicie os testes:

```bash
npm test
```

## Uso

## Registrar uma compra

Método HTTP: POST

Endpoint: **/compras/criarCompra**

Parâmetros:

tipo (obrigatório): o tipo da compra (crédito ou débito)

valor (obrigatório): o valor da compra

data (preenchimento default): a data da compra (padrão: data atual)

Exemplo de requisição json:

```bash
{
"tipo": "credito",
"valor": 50
}
```

Exemplo de resposta json:

```bash
{
"\_id": "615fa447a2d929002a7f50a6",
"tipo": "credito",
"valor": 50,
"data": "2021-10-07T18:46:47.741Z",
"\_\_v": 0
}
```

## Listar compras

Método HTTP: GET

Endpoint: **/compras/**

Parâmetros: nenhum

Exemplo de requisição: GET **/compras/**

Exemplo de resposta json (lista vazia):

```bash
{
[]
}
```

Exemplo de resposta json (lista com uma compra):

```bash
{
"compras": [
{
"_id": "615fa447a2d929002a7f50a6",
"tipo": "credito",
"valor": 50,
"data": "2021-10-07T18:46:47.741Z",
"__v": 0
}
]
}
```

## Solicitar Relatório

Método HTTP: GET

Endpoint: **/compras/relatorio**

Parâmetros:

data (preenchimento default): ano-mês-dia

Exemplo de requisição json:

```bash
{
"data": "2023-05-14"
}
```

Exemplo de resposta json (lista vazia):

```bash
{
[]
}
```

Exemplo de resposta json (lista de compras pesquisando na data 2023-05-14):

```bash
{
    "compras": [
        {
            "_id": "64613ce2aaef651550da44e8",
            "tipo": "credito",
            "valor": 100,
            "data": "2023-05-14T04:00:00.000Z",
            "__v": 0
        },
        {
            "_id": "64613ce3aaef651550da44ea",
            "tipo": "credito",
            "valor": 100,
            "data": "2023-05-14T04:00:00.000Z",
            "__v": 0
        },
        {
            "_id": "64613ce4aaef651550da44ec",
            "tipo": "credito",
            "valor": 100,
            "data": "2023-05-14T04:00:00.000Z",
            "__v": 0
        },
        {
            "_id": "64613e1453e94fb98cd18b52",
            "tipo": "debito",
            "valor": 100,
            "data": "2023-05-14T04:00:00.000Z",
            "__v": 0
        }
    ],
    "saldoConsolidado": 400
}
```
