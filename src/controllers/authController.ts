import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService.js';
import { SignUpData, SignInData } from '../types/index.js';

export const authController = {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: SignUpData = req.body;
      const user = await authService.signUp(userData);
      
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const signInData: SignInData = req.body;
      const result = await authService.signIn(signInData);
      
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
};
