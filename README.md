# 🧪 Teste Técnico – Processamento de Jornadas de Usuário

Projeto desenvolvido como parte do processo seletivo da Nemu, com o objetivo de processar jornadas de usuários a partir de dados brutos em `.xlsx`, expor uma API com os resultados agrupados e criar uma interface visual para exibição.

---

## 📁 Estrutura do Projeto

Este repositório contém dois projetos separados:

- **Backend (`/journey-api`)** – API REST com Node.js + TypeScript
- **Frontend (`/journey-frontend`)** – Interface com React + TypeScript + CSS Modules

---

## 🚀 Como executar o projeto

### 📌 Pré-requisitos

- Node.js v18+
- npm ou yarn
- Planilha de jornadas no formato `.xlsx`

---

## 📦 Backend

### 1. Acesse a pasta do backend

```bash
cd journey-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Adicione a planilha

Salve a planilha `.xlsx` com os dados brutos na pasta `data/`, com o nome:

```
journeys.xlsx
```

### 4. Inicie a API

```bash
npm run dev
```

A API estará disponível em: [http://localhost:3000/journeys](http://localhost:3000/journeys)

---

## 💻 Frontend

### 1. Acesse a pasta do frontend

```bash
cd journey-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o frontend

```bash
npm run dev
```

O app estará disponível em: [http://localhost:5173](http://localhost:5173)

---

## 🛠 Tecnologias Utilizadas

### Backend

- Node.js
- Express
- TypeScript
- xlsx

### Frontend

- React
- Vite
- TypeScript
- CSS Modules