# 💰 Sistema Financeiro

Sistema completo de gestão financeira com **React + TypeScript** no frontend e **.NET 8** no backend, utilizando **PostgreSQL** como banco de dados.

---

## 🚀 Tecnologias Utilizadas

### Frontend (frontend-financeiro)
- React 19;
- TypeScript;
- React Router DOM;
- Axios;
- CSS Modules.

### Backend (CRUD.Controle)
- Utilização da IDE Visual Studio;
- .NET 8;
- Dapper (ORM);
- PostgreSQL.

### Banco de Dados
- PostgreSQL;
- pgAdmin (interface gráfica).

## 📋 Funcionalidades

### ✅ Pessoas
- [x] Cadastrar pessoa (nome, idade);
- [x] Listar todas as pessoas;
- [x] Editar pessoa;
- [x] Excluir pessoa (com exclusão em cascata das transações);
- [x] Botão para criar transação vinculada à pessoa.

### ✅ Categorias
- [x] Cadastrar categoria (descrição, finalidade: despesa/receita/ambas);
- [x] Listar todas as categorias;
- [x] Excluir categoria (com validação de transações vinculadas).

### ✅ Transações
- [x] Cadastrar transação (descrição, valor, tipo, categoria, pessoa);
- [x] Validação: menores de 18 anos só podem fazer despesas;
- [x] Validação: categoria deve ser compatível com o tipo da transação;
- [x] Listar todas as transações.

### 📊 Relatórios
- [x] Totais por pessoa (receitas, despesas, saldo);
- [x] Totais por categoria (receitas, despesas, saldo);
- [x] Totais gerais.

---

## 🗄️ Configuração do Banco de Dados (PostgreSQL)

### 1. Instalar PostgreSQL e pgAdmin
- Baixe e instale o [PostgreSQL](https://www.postgresql.org/download/);
- Durante a instalação, anote a senha do usuário `postgres`;
- O pgAdmin já vem incluído na instalação.

### 2. Criar o banco de dados
Abra o **pgAdmin**, conecte-se ao servidor local e crie uma nova database, chamada "financeiro", após isso abra a query tool associada à essa base de dados e rode o script para a criação das tabelas, presente no arquivo "financeiro_db".

## ⚙️ Configuração do Backend
### 1. Configurar string de conexão
- No arquivo CRUD.Controle/appsettings.json realizar as mudanças necessárias para as strings de conexão da sua máquina.

### 2. Restaurar pacotes do Visual Studio
- Entrar na pasta que está no mesmo nível do arquivo de configuração do projeto ".csproj":
  - /financeiro/CRUD.Controle
  
-  Executar o comando para restaurar os pacotes:
  - dotnet restore

- Rodar backend:
  - Por fim rodar o projeto do backend e verificar a porta em que está hospedado;
  - Caso a aplicação esteja rodando em outra porta, verifique as referências à "http://localhost:5006".

## 🎨 Configuração do Frontend
### 1. Instalar dependências
- npm install.

### 2. Configurar URL da API
- Ajustar as referências à API em frontend-financeiro/src/apis/clientApi.ts, caso necessário;

### 3. Rodar Frontend
- npm run dev
