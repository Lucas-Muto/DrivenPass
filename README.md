# DrivenPass - Gerenciador de Senhas

Um gerenciador de senhas seguro desenvolvido com Node.js, TypeScript, Express e Prisma.

## 🚀 Tecnologias

- **Node.js** com **TypeScript**
- **Express.js** para API REST
- **Prisma** como ORM
- **PostgreSQL** como banco de dados
- **JWT** para autenticação
- **bcrypt** para hash de senhas
- **cryptr** para criptografia de credenciais
- **Joi** para validação de dados

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd DrivenPass
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/DrivenPass?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
CRYPTR_SECRET="your-super-secret-cryptr-key-change-this-in-production"
PORT=3000
```

4. Execute as migrations do banco de dados:
```bash
npm run prisma:migrate
```

5. Execute o seed para criar o usuário demo:
```bash
npm run prisma:seed
```

## 🏃‍♂️ Como executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 📚 API Endpoints

### 🔓 Rotas Públicas

- **GET** `/health` - Status da aplicação
- **POST** `/sign-up` - Cadastro de usuário
- **POST** `/sign-in` - Login de usuário

### 🔒 Rotas Protegidas (necessitam autenticação)

- **POST** `/credentials` - Criar credencial
- **GET** `/credentials` - Listar todas as credenciais
- **GET** `/credentials/:id` - Buscar credencial por ID
- **PUT** `/credentials/:id` - Atualizar credencial
- **DELETE** `/credentials/:id` - Deletar credencial
- **DELETE** `/erase` - Deletar conta e todos os dados

## 👤 Usuário Demo

O sistema já vem com um usuário de demonstração:

- **Email:** demo@driven.com.br
- **Senha:** demo123

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Compila o TypeScript
- `npm start` - Executa a versão compilada
- `npm run prisma:generate` - Gera o cliente Prisma
- `npm run prisma:migrate` - Executa migrations
- `npm run prisma:seed` - Executa o seed do banco

## 🏗️ Arquitetura

O projeto segue a arquitetura em camadas (layered architecture):

```
src/
├── controllers/     # Controladores (recebem requisições)
├── services/        # Lógica de negócio
├── repositories/    # Acesso aos dados
├── middlewares/     # Middlewares (validação, autenticação, etc.)
├── routes/          # Definição das rotas
├── schemas/         # Schemas de validação (Joi)
├── utils/           # Utilitários (criptografia, JWT)
├── types/           # Tipos TypeScript
└── prisma/          # Configuração do Prisma e seed
```

## 🔐 Segurança

- Senhas dos usuários são hasheadas com **bcrypt**
- Senhas das credenciais são criptografadas com **cryptr**
- Autenticação via **JWT**
- Validação de dados com **Joi**
- Middleware de tratamento de erros

## 📝 Deploy

*Link do deploy será adicionado aqui após o deploy na nuvem*
