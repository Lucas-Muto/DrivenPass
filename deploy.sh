#!/bin/bash

echo "🚀 Iniciando deploy..."

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Gerar Prisma Client
echo "🔧 Gerando Prisma Client..."
npx prisma generate

# Executar migrations
echo "📊 Executando migrations..."
npx prisma migrate deploy

# Executar seed
echo "🌱 Executando seed..."
npm run prisma:seed

# Build do projeto
echo "🏗️ Compilando TypeScript..."
npm run build

echo "✅ Deploy concluído!"
