import { prisma } from '../prisma/database.js';
import { CreateCredentialData } from '../types/index.js';

export const credentialRepository = {
  async create(credentialData: CreateCredentialData & { userId: number }) {
    return await prisma.credential.create({
      data: credentialData
    });
  },

  async findByUserIdAndTitle(userId: number, title: string) {
    return await prisma.credential.findUnique({
      where: {
        userId_title: {
          userId,
          title
        }
      }
    });
  },

  async findAllByUserId(userId: number) {
    return await prisma.credential.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  },

  async findByIdAndUserId(id: number, userId: number) {
    return await prisma.credential.findFirst({
      where: { 
        id,
        userId 
      }
    });
  },

  async updateById(id: number, credentialData: Partial<CreateCredentialData>) {
    return await prisma.credential.update({
      where: { id },
      data: credentialData
    });
  },

  async deleteById(id: number) {
    return await prisma.credential.delete({
      where: { id }
    });
  },

  async deleteAllByUserId(userId: number) {
    return await prisma.credential.deleteMany({
      where: { userId }
    });
  }
};
