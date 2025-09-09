# Deploy no Render - DrivenPass

## Configuração do Deploy

### Opção 1: Usando render.yaml (Recomendado)
O arquivo `render.yaml` está configurado para executar automaticamente:
1. `npm install` - Instalar dependências
2. `npm run build:production` - Build com migrations e seed

### Opção 2: Configuração Manual no Render
Se o `render.yaml` não funcionar, configure manualmente:

**Build Command:**
```bash
npm install && npx prisma generate && npx prisma migrate deploy && npm run prisma:seed && npm run build
```

**Start Command:**
```bash
npm start
```

### Variáveis de Ambiente Necessárias
- `DATABASE_URL` - String de conexão PostgreSQL (automática do Render)
- `JWT_SECRET` - Chave secreta para JWT (gerar automaticamente)
- `CRYPTR_SECRET` - Chave secreta para criptografia (gerar automaticamente)
- `NODE_ENV=production`
- `PORT=10000`

### Troubleshooting

#### Erro: "The table `public.users` does not exist"
Este erro indica que as migrations não foram executadas. Soluções:

1. **Verificar logs do build** - Procure por erros durante `prisma migrate deploy`
2. **Reexecutar deploy** - Às vezes uma segunda tentativa resolve
3. **Configuração manual** - Use a Opção 2 acima

#### Verificar se o banco está funcionando
A aplicação agora verifica automaticamente a conexão com o banco ao iniciar.

#### Usuário Demo
Após o deploy bem-sucedido, estará disponível:
- Email: `demo@driven.com.br`
- Senha: `demo123`

### Estrutura de Migrations
```
prisma/migrations/
└── 20250905193803_init/
    └── migration.sql
```

### Comandos Úteis para Debug Local
```bash
# Verificar status das migrations
npx prisma migrate status

# Resetar banco (desenvolvimento apenas)
npx prisma migrate reset

# Aplicar migrations
npx prisma migrate deploy

# Executar seed
npm run prisma:seed
```
