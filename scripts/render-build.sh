#!/bin/bash

set -e  # Exit on any error

echo "🚀 Iniciando build no Render..."

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Gerar Prisma Client
echo "🔧 Gerando Prisma Client..."
npx prisma generate

# Executar migrations (com retry em caso de falha)
echo "📊 Executando migrations..."
for i in {1..3}; do
    if npx prisma migrate deploy; then
        echo "✅ Migrations executadas com sucesso"
        break
    else
        echo "⚠️ Tentativa $i de migration falhou, tentando novamente em 5 segundos..."
        sleep 5
    fi
    if [ $i -eq 3 ]; then
        echo "❌ Falha ao executar migrations após 3 tentativas"
        exit 1
    fi
done

# Executar seed (com retry em caso de falha)
echo "🌱 Executando seed..."
for i in {1..3}; do
    if npm run prisma:seed; then
        echo "✅ Seed executado com sucesso"
        break
    else
        echo "⚠️ Tentativa $i de seed falhou, tentando novamente em 5 segundos..."
        sleep 5
    fi
    if [ $i -eq 3 ]; then
        echo "⚠️ Falha ao executar seed após 3 tentativas, continuando..."
    fi
done

# Build do projeto
echo "🏗️ Compilando TypeScript..."
npm run build

echo "✅ Build concluído com sucesso!"
