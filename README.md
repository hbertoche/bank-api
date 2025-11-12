# bank-api
Projeto para o desafio da Velotax para criar uma API em Express com TS, com um crud de usuario/transações financeiras. Basicamente um mini banco sem transações p2p (apenas depósito/saque/leitura)


# Desafio:
Criar uma API (express com typescript) que tenha um CRUD de usuário e transações financeiras. Além disso, deve ser possível saber o saldo em uma data específica numa data anterior (se antes da criação da conta, o saldo é zero). Considere que existam diversas transações durante o dia, mas suas buscas devem ser performáticas.
Crie esquemas das collections utilizando MongoDB com Mongoose.


## Casos de teste

Usuário:
Criar usuário
Editar usuário
Excluir usuário
Criar novamente o usuário

Transações:
Criar 5 transações
Ver saldo
Editar data de 3 transações para d -2 (2 dias atrás)
Ver saldo da conta 2 dias atrás

## Base de Modelo dos dados (fiz algumas alterações que achei pertinente)
User {
_id: objectId | string
cpf: string // único
email: string
nome: string
}

Transaction {
transactionType: string // sinta-se livre pra usar ENUM se preferir
amount: number
date: Date
userId: ObjectId | string
}


# Como rodar o projeto:
- Copiar o example.env para .env
- Preencher com as credenciais configuradas no seu ambiente local (conexão com o mongo-db/porta que a aplicação vai rodar)
- npm install
- npm run dev