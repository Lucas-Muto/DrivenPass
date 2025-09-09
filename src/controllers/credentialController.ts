import { Response, NextFunction } from 'express';
import { credentialService } from '../services/credentialService.js';
import { CredentialRequestData, AuthenticatedRequest } from '../types/index.js';

export const credentialController = {
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const credentialData: CredentialRequestData = req.body;
      const userId = req.userId!;
      
      const credential = await credentialService.create(credentialData, userId);
      
      res.status(201).json(credential);
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;
      const credentials = await credentialService.findAll(userId);
      
      res.status(200).json(credentials);
    } catch (error) {
      next(error);
    }
  },

  async findById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const userId = req.userId!;
      
      const credential = await credentialService.findById(id, userId);
      
      res.status(200).json(credential);
    } catch (error) {
      next(error);
    }
  },

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const credentialData: CredentialRequestData = req.body;
      const userId = req.userId!;
      
      await credentialService.update(id, credentialData, userId);
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const userId = req.userId!;
      
      await credentialService.delete(id, userId);
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};
