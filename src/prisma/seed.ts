import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Executando seed...');

  try {
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
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    // Não parar o processo se o seed falhar
    console.log('⚠️ Continuando sem seed...');
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro crítico no seed:', e);
    // Não sair com erro para não quebrar o deploy
    console.log('⚠️ Seed falhou, mas continuando deploy...');
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
