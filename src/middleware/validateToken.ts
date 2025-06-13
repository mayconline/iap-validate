import type { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { env } from './../services';

export function validateToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization)
    return response.status(401).send({ error: 'Unauthorized' });

  const token = authorization.replace('Bearer', '').trim();

  try {
    verify(token, env.JWT_TOKEN);

    return next();
  } catch {
    return response.status(401).send({ error: 'Unauthorized' });
  }
}
