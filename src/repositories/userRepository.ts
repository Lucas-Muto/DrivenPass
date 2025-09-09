import { prisma } from '../prisma/database.js';
import { SignUpData } from '../types/index.js';

export const userRepository = {
  async create(userData: SignUpData) {
    return await prisma.user.create({
      data: userData
    });
  },

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    });
  },

  async findById(id: number) {
    return await prisma.user.findUnique({
      where: { id }
    });
  },

  async deleteById(id: number) {
    return await prisma.user.delete({
      where: { id }
    });
  }
};
