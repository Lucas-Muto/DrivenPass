import Joi from 'joi';

export const credentialSchema = Joi.object({
  title: Joi.string().min(1).required().messages({
    'string.empty': 'Título é obrigatório',
    'any.required': 'Título é obrigatório'
  }),
  url: Joi.string().uri().required().messages({
    'string.uri': 'URL deve ter um formato válido',
    'string.empty': 'URL é obrigatória',
    'any.required': 'URL é obrigatória'
  }),
  username: Joi.string().min(1).required().messages({
    'string.empty': 'Nome de usuário é obrigatório',
    'any.required': 'Nome de usuário é obrigatório'
  }),
  password: Joi.string().min(1).required().messages({
    'string.empty': 'Senha é obrigatória',
    'any.required': 'Senha é obrigatória'
  })
});
