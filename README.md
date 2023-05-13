# Sistema de Gerenciamento de Compras

Este é um sistema de gerenciamento de compras, onde é possível registrar e listar compras.

## Instalação
Clone o repositório do GitHub:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
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

## Uso

## Registrar uma compra
Método HTTP: POST

Endpoint: /compras/criarCompra

Parâmetros:

tipo (obrigatório): o tipo da compra (crédito ou débito)
valor (obrigatório): o valor da compra
data (opcional): a data da compra (padrão: data atual)
Exemplo de requisição:

json

```bash
{
"tipo": "credito",
"valor": 50
}
```

Exemplo de resposta:

json

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

Endpoint: /compras/listarCompras

Parâmetros: nenhum

Exemplo de requisição: GET /compras/listarCompras

Exemplo de resposta (lista vazia):

json

```bash
{
"message": "Não há compras registradas."
}
```

Exemplo de resposta (lista com uma compra):

json

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
