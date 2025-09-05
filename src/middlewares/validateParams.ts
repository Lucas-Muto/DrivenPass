import { Request, Response, NextFunction } from 'express';

export function validateNumericParam(paramName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const param = req.params[paramName];
    const numericParam = parseInt(param, 10);

    if (isNaN(numericParam) || numericParam <= 0) {
      return res.status(400).json({
        message: `O parâmetro ${paramName} deve ser um número positivo`
      });
    }

    // Adiciona o parâmetro validado ao request
    req.params[paramName] = numericParam.toString();
    next();
  };
}
