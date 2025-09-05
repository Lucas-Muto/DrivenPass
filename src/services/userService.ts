import { userRepository } from '../repositories/userRepository.js';
import { credentialRepository } from '../repositories/credentialRepository.js';
import { AppError } from '../middlewares/errorHandler.js';

export const userService = {
  async deleteUserData(userId: number) {
    // Verificar se o usuário existe
    const user = await userRepository.findById(userId);
    
    if (!user) {
      const error = new Error('Usuário não encontrado') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Deletar todas as credenciais do usuário
    await credentialRepository.deleteAllByUserId(userId);
    
    // Deletar o usuário
    await userRepository.deleteById(userId);
  }
};
