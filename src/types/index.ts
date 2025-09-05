export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface CreateCredentialData {
  title: string;
  url: string;
  username: string;
  password: string;
}

import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  userId?: number;
}
