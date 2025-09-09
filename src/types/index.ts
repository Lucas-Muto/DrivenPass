import { Prisma } from '@prisma/client';
import { Request } from 'express';

// Usando tipos gerados pelo Prisma
export type CreateUserData = Prisma.UserCreateInput;
export type UpdateUserData = Prisma.UserUpdateInput;
export type CreateCredentialData = Prisma.CredentialCreateInput;
export type UpdateCredentialData = Prisma.CredentialUpdateInput;

// Tipos customizados para requisições específicas
export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface CredentialRequestData {
  title: string;
  url: string;
  username: string;
  password: string;
}

export interface AuthenticatedRequest extends Request {
  userId?: number;
}
