import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
}

export function errorHandler(
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('❌ Erro:', error);

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Erro interno do servidor';

  res.status(statusCode).json({
    error: message
  });
}
