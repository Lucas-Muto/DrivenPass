import { Response, NextFunction } from 'express';
import { userService } from '../services/userService.js';
import { AuthenticatedRequest } from '../types/index.js';

export const userController = {
  async deleteUserData(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;
      
      await userService.deleteUserData(userId);
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};
