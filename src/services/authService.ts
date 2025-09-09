import { userRepository } from '../repositories/userRepository.js';
import { SignUpData, SignInData } from '../types/index.js';
import { hashPassword, comparePassword } from '../utils/cryptoUtils.js';
import { generateToken } from '../utils/jwtUtils.js';
import { AppError } from '../middlewares/errorHandler.js';

export const authService = {
  async signUp(userData: SignUpData) {
    // Verificar se o usuário já existe
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      const error = new Error('Usuário já cadastrado com este email') as AppError;
      error.statusCode = 409;
      throw error;
    }

    // Criptografar a senha
    const hashedPassword = await hashPassword(userData.password);

    // Criar o usuário
    const newUser = await userRepository.create({
      ...userData,
      password: hashedPassword
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };
  },

  async signIn(signInData: SignInData) {
    // Verificar se o usuário existe
    const user = await userRepository.findByEmail(signInData.email);
    if (!user) {
      const error = new Error('Email não encontrado') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Verificar a senha
    const isPasswordValid = await comparePassword(signInData.password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Senha incorreta') as AppError;
      error.statusCode = 401;
      throw error;
    }

    // Gerar token JWT
    const token = generateToken(user.id);

    return { token };
  }
};
