# 🚀 Deploy Manual no Render - Passo a Passo

## Passo 1: Criar Banco PostgreSQL

1. **Acesse o Render Dashboard**: https://dashboard.render.com
2. **Clique em "New +" → "PostgreSQL"**
3. **Configure o banco:**
   - Name: `drivenpass-db`
   - Database: `drivenpass`
   - User: `drivenpass`
   - Region: escolha a mais próxima
   - PostgreSQL Version: 15 (ou mais recente)
   - Plan: Free (para teste)
4. **Clique em "Create Database"**
5. **Aguarde a criação** (pode levar alguns minutos)
6. **Copie a "External Database URL"** - você precisará dela

## Passo 2: Criar Serviço Web

1. **Clique em "New +" → "Web Service"**
2. **Conecte seu repositório GitHub**
3. **Configure o serviço:**
   - Name: `drivenpass-api`
   - Environment: `Node`
   - Build Command: 
     ```
     npm install && npx prisma generate && npx prisma migrate deploy && npx prisma db seed && npm run build
     ```
   - Start Command: `npm start`
   - Instance Type: Free

## Passo 3: Configurar Variáveis de Ambiente

Adicione as seguintes variáveis:

1. **DATABASE_URL**
   - Value: Cole a "External Database URL" do banco criado no Passo 1

2. **NODE_ENV**
   - Value: `production`

3. **PORT**
   - Value: `10000`

4. **JWT_SECRET**
   - Value: Gere uma chave aleatória (32+ caracteres)
   - Exemplo: `your-super-secret-jwt-key-here-make-it-long-and-random`

5. **CRYPTR_SECRET**
   - Value: Gere outra chave aleatória (32+ caracteres)
   - Exemplo: `your-cryptr-secret-key-for-encrypting-passwords-here`

## Passo 4: Deploy

1. **Clique em "Create Web Service"**
2. **Aguarde o build** - acompanhe os logs
3. **Procure por estas mensagens nos logs:**
   ```
   🌱 Executando seed...
   ✅ Usuário demo criado
   🚀 Servidor rodando na porta 10000
   ```

## Passo 5: Testar

Após o deploy bem-sucedido, teste:

1. **Health Check:**
   ```
   GET https://seu-app.onrender.com/health
   ```

2. **Login com usuário demo:**
   ```
   POST https://seu-app.onrender.com/sign-in
   Content-Type: application/json
   
   {
     "email": "demo@driven.com.br",
     "password": "demo123"
   }
   ```

## Troubleshooting

### Se o build falhar:
1. Verifique os logs de build
2. Certifique-se que todas as variáveis de ambiente estão configuradas
3. Tente fazer redeploy

### Se as migrations não executarem:
1. Acesse o banco via External Database URL
2. Execute manualmente:
   ```sql
   SELECT * FROM information_schema.tables WHERE table_schema = 'public';
   ```
3. Se não houver tabelas, o problema está na execução das migrations

### Se o seed falhar:
- O deploy deve continuar mesmo se o seed falhar
- Você pode criar o usuário demo manualmente depois

## Comandos Úteis para Debug

Se precisar debugar localmente:

```bash
# Verificar migrations
npx prisma migrate status

# Aplicar migrations manualmente
npx prisma migrate deploy

# Executar seed manualmente
npm run prisma:seed

# Build local
npm run build

# Testar localmente
npm start
```
