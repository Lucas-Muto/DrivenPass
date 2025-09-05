import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Executando seed...');

  // Verificar se o usuário demo já existe
  const existingUser = await prisma.user.findUnique({
    where: { email: 'demo@driven.com.br' }
  });

  if (existingUser) {
    console.log('👤 Usuário demo já existe!');
    return;
  }

  // Criar usuário demo
  const hashedPassword = await bcrypt.hash('demo123', 10);
  
  const demoUser = await prisma.user.create({
    data: {
      name: 'Demo',
      email: 'demo@driven.com.br',
      password: hashedPassword
    }
  });

  console.log('✅ Usuário demo criado:', {
    id: demoUser.id,
    name: demoUser.name,
    email: demoUser.email
  });
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
