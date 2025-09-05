import { Request, Response } from 'express';

export const healthController = {
  async check(req: Request, res: Response) {
    res.status(200).json({ message: "I'm OK!" });
  }
};
