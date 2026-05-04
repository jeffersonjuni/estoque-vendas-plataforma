# 🚀 StockSales — Plataforma de Controle de Estoque e Vendas

Sistema full stack para gerenciamento de produtos, estoque, vendas e relatórios, desenvolvido com foco em performance, escalabilidade e experiência do usuário.

---

## 📌 Sobre o projeto

O **StockSales** é uma aplicação que simula um sistema real de controle de estoque e vendas, incluindo autenticação, dashboard analítico e exportação de relatórios.

O projeto foi construído seguindo boas práticas de arquitetura, separação de responsabilidades e componentização, com uma estrutura escalável e pronta para produção.

---

## ✨ Funcionalidades

### 🔐 Autenticação
- Login com e-mail e senha  
- Registro de usuários  
- Sessão persistente com JWT  
- Proteção de rotas privadas  
- Validação de senha forte  

---

### 📦 Produtos
- CRUD completo de produtos  
- Listagem responsiva (tabela + cards)  
- Atualização em tempo real  
- Feedback visual com toasts e modais  

---

### 📊 Estoque
- Entrada e saída de produtos  
- Validação de estoque  
- Histórico de movimentações  
- Interface responsiva  

---

### 💰 Vendas
- Carrinho de compras funcional  
- Controle automático de estoque  
- Registro de vendas  
- Cálculo automático de totais  

---

### 📈 Dashboard
- Visualização de faturamento  
- Gráficos interativos (padrão SaaS)  
- Filtros por período  
- Métricas em tempo real  

---

### 📄 Relatórios
- Exportação em CSV e PDF  
- Filtro por período  
- Dados consistentes com dashboard  

---

### ⚙️ Configurações
- Atualização de perfil  
- Alteração de senha  
- Validações de segurança  

---

### 🔔 Alertas
- Notificação de estoque baixo  
- Atualização automática  
- Badge de alerta no header  

---

## 🛠️ Tecnologias

### Frontend
- Next.js (App Router)  
- React  
- TypeScript  
- Tailwind CSS  

### Backend
- API Routes (Next.js - Serverless)  
- Prisma ORM  
- NextAuth  

### Banco de dados
- MySQL  

---

## 🧱 Arquitetura

- Separação por camadas:
  - `services`
  - `components`
  - `hooks`
  - `utils`
- API desacoplada do frontend  
- Prisma como camada de acesso a dados  
- Componentização reutilizável  
- Estrutura escalável e organizada  

---

## ⚙️ Como rodar o projeto localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/jeffersonjuni/estoque-vendas-plataforma
cd estoque-vendas-plataforma
```
### 2. Instalar dependências
```bash
npm install
```
### 3. Configurar variáveis de ambiente
Crie um arquivo .env:
```bash
DATABASE_URL="mysql://user:password@localhost:3306/database"
NEXTAUTH_SECRET="sua_secret"
NEXTAUTH_URL="http://localhost:3000"
```
### 4. Subir o banco com Docker
```bash
docker-compose up -d
```
### 5. Rodar migrations
```bash
npx prisma migrate dev
```
### 6. Iniciar aplicação
```bash
npm run dev
```
---

## 🌐 Deploy (Produção)

A aplicação está preparada para rodar em ambiente real com arquitetura serverless.

🔹Infraestrutura
- Frontend + Backend: Vercel 
- Banco de dados: Railway (MySQL)
  
🔹Banco de Dados
- Banco MySQL provisionado na Railway
- Conexão remota via `DATABASE_URL`
```bash
npx prisma migrate deploy
```
---

🔹Backend
- API Routes do Next.js rodando como serverless
- Integração direta com banco em produção
- Suporte completo a:
  - `autenticação`
  - `produtos`
  - `estoque`
  - `vendas`
  - `relatórios`
---

🔹 Frontend
- Deploy via Vercel
- Integração com GitHub (CI/CD automático)
- Build otimizado para produção

---

🔹 Variáveis de Ambiente (Vercel)
  ```bash
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```
- Separação entre ambiente local e produção
- Configuração segura para autenticação
---

🔹 Testes em Produção
- Autenticação (login/registro/logout)
- CRUD de produtos
- Movimentação de estoque
- Vendas com atualização automática
- Dashboard e relatórios
- Exportação (CSV/PDF)
- Alertas de estoque
- Configurações de usuário
---

## 📁 Estrutura do projeto
 ```bash
src/
 ├── app/
 ├── components/
 ├── services/
 ├── hooks/
 ├── utils/
 ├── styles/
 └── types/
```
---

## 👨‍💻 Autor
Jefferson Junior


