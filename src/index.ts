import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { prisma } from './prisma/database.js';

dotenv.config();

// Verificar conexão com banco de dados
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Conexão com banco de dados estabelecida');
    
    // Verificar se as tabelas existem
    await prisma.user.findFirst();
    console.log('✅ Tabelas do banco de dados verificadas');
  } catch (error) {
    console.error('❌ Erro na conexão com banco de dados:', error);
    console.error('💡 Verifique se as migrations foram executadas corretamente');
    process.exit(1);
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(router);

// Error handling middleware (deve ser o último)
app.use(errorHandler);

app.listen(PORT, async () => {
  await checkDatabaseConnection();
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
