import { credentialRepository } from '../repositories/credentialRepository.js';
import { CredentialRequestData } from '../types/index.js';
import { encryptData, decryptData } from '../utils/cryptoUtils.js';
import { AppError } from '../middlewares/errorHandler.js';

export const credentialService = {
  async create(credentialData: CredentialRequestData, userId: number) {
    // Verificar se já existe uma credencial com o mesmo título para o usuário
    const existingCredential = await credentialRepository.findByUserIdAndTitle(
      userId, 
      credentialData.title
    );
    
    if (existingCredential) {
      const error = new Error('Já existe uma credencial com este título') as AppError;
      error.statusCode = 409;
      throw error;
    }

    // Criptografar a senha
    const encryptedPassword = encryptData(credentialData.password);

    // Criar a credencial
    const newCredential = await credentialRepository.create({
      ...credentialData,
      password: encryptedPassword,
      userId
    });

    return {
      id: newCredential.id,
      title: newCredential.title,
      url: newCredential.url,
      username: newCredential.username,
      password: credentialData.password, // Retorna a senha descriptografada
      createdAt: newCredential.createdAt
    };
  },

  async findAll(userId: number) {
    const credentials = await credentialRepository.findAllByUserId(userId);
    
    // Descriptografar as senhas
    return credentials.map(credential => ({
      id: credential.id,
      title: credential.title,
      url: credential.url,
      username: credential.username,
      password: decryptData(credential.password),
      createdAt: credential.createdAt
    }));
  },

  async findById(id: number, userId: number) {
    const credential = await credentialRepository.findByIdAndUserId(id, userId);
    
    if (!credential) {
      const error = new Error('Credencial não encontrada') as AppError;
      error.statusCode = 404;
      throw error;
    }

    return {
      id: credential.id,
      title: credential.title,
      url: credential.url,
      username: credential.username,
      password: decryptData(credential.password),
      createdAt: credential.createdAt
    };
  },

  async update(id: number, credentialData: CredentialRequestData, userId: number) {
    // Verificar se a credencial existe e pertence ao usuário
    const existingCredential = await credentialRepository.findByIdAndUserId(id, userId);
    
    if (!existingCredential) {
      const error = new Error('Credencial não encontrada') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Verificar se o novo título já existe para outro registro do mesmo usuário
    if (credentialData.title !== existingCredential.title) {
      const credentialWithSameTitle = await credentialRepository.findByUserIdAndTitle(
        userId, 
        credentialData.title
      );
      
      if (credentialWithSameTitle && credentialWithSameTitle.id !== id) {
        const error = new Error('Já existe uma credencial com este título') as AppError;
        error.statusCode = 409;
        throw error;
      }
    }

    // Criptografar a nova senha
    const encryptedPassword = encryptData(credentialData.password);

    // Atualizar a credencial
    await credentialRepository.updateById(id, {
      ...credentialData,
      password: encryptedPassword
    });
  },

  async delete(id: number, userId: number) {
    // Verificar se a credencial existe e pertence ao usuário
    const existingCredential = await credentialRepository.findByIdAndUserId(id, userId);
    
    if (!existingCredential) {
      const error = new Error('Credencial não encontrada') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Deletar a credencial
    await credentialRepository.deleteById(id);
  }
};
